import mockjs from 'mockjs'
import markData from './mark-data'
import { mapDatas, siblingMaps } from './map-data'

function mockGetMapList() {
  mockjs.mock(new RegExp('/api/map/getMapList'), 'get', () => {
    return siblingMaps
  })
}

function mockGetMapInfo() {
  mockjs.mock(new RegExp('/api/map/getMapInfo'), 'get', (opts) => {
    const urlParams = new URLSearchParams(opts.url.split('?')[1])
    const id = parseInt(urlParams.get('id') ?? '48', 10)

    return mapDatas.find((item) => item.id == id)
  })
}

function mockGetMarkerList() {
  mockjs.mock(new RegExp('/api/mark/getMarkList'), 'get', (opts) => {
    const urlParams = new URLSearchParams(opts.url.split('?')[1])
    const ids = urlParams.get('ids')
    return markData
      .filter((item) => ids?.split(',')?.includes(item.landmarkCatalogId + ''))
      .map((item) => ({ ...item, iconUrl: item.landmarkCatalogId !== undefined ? _getIcon(item.landmarkCatalogId) ?? '' : '' }))
  })
}

function mockGetAllMarkerList() {
  mockjs.mock(new RegExp('/api/mark/getAllMarkList'), 'get', (opts) => {
    return markData
      .filter((item) => true)
      .map((item) => ({ ...item, iconUrl: item.landmarkCatalogId !== undefined ? _getIcon(item.landmarkCatalogId) ?? '' : '' }))
  })
}

const _iconMap = new Map()
function _getIcon(id: number): string | void {
  if (_iconMap.has(id)) {
    return _iconMap.get(id)
  }
  for (const i of mapDatas) {
    for (const j of i.landmarkCatalogGroups) {
      for (const k of j.landmarkCatalogs) {
        _iconMap.set(k.id, k.iconUrl)
        if (k.id == id) {
          return k.iconUrl
        }
      }
    }
  }
}

export function setupMock() {
  mockGetMapList()//三张地图  列表数据
  mockGetMapInfo()//标记菜单  列表数据
  mockGetAllMarkerList()//标记点位  列表数据
  mockGetMarkerList()//标记点位  列表数据
}
