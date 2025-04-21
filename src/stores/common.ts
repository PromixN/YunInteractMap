import { getMapInfo, getMapList, getMarkList, getAllMark } from '@/api'
import type { MarkerPosition } from '@/types/type'
import markData from '../mocks/mark-data'

// 地图组件和标记组件之间通过状态管理交互   因为是两个组件同级且全局  所以将数据和方法都作为公共状态管理
export const useCommonStore = defineStore('common', () => {
  const mapId = ref(48)//默认地图id
  const mapInfo = ref<any>()//地图图片信息
  const mapList = ref<Array<{ id: number; name: string; regionName: string }>>([])//地图列表

  const selectedMarkCatalogs = ref<number[]>([])//选中的标记点类型
  const markers = ref<any[]>([])//标记点列表
  const markStatus = ref(false)//标记模式开启状态
  const curMarker = ref<MarkerPosition>({ x: 0, y: 0 })//当前标记点坐标
  const mapName = ref('')//当前地图名称

  // 加载地图列表
  async function loadMapListAction() {
    mapList.value = await getMapList()
  }
  // 载入地图图片信息
  async function loadMapInfoAction() {
    mapInfo.value = await getMapInfo(mapId.value)
  }
  // 切换地图
  function changeMapIdAction(id: number) {
    mapId.value = id
    selectedMarkCatalogs.value = []

    loadMapInfoAction()//重载地图图片信息
    loadMarkerListsAction()//重载地图上的点位数据
    mapName.value = mapList.value.find((item) => item.id === id)?.name ?? '未知地图'
  }

  async function exportMapInfoAction(id:number)
  {
    // let marks = await getMarkList(selectedMarkCatalogs.value)
    let marks =  await getAllMark()
    let mask_str = JSON.stringify(marks,null, 2)
    const blob = new Blob([mask_str], {type: "application/json;charset=utf-8"});
    const url = URL.createObjectURL(blob);
     
    // 创建一个下载链接并模拟点击下载
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mapdata.json'; // 设置下载文件的名称
    document.body.appendChild(a);
    a.click();
     
    // 清理并释放URL对象
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    console.log('导出地图信息',marks)
  }


  // 点击标点菜单 存储标点类型
  function addMarkCatalogAction(id: number | undefined) {
    if (id === undefined) return
    selectedMarkCatalogs.value = [...selectedMarkCatalogs.value, id]
    loadMarkerListsAction()
  }
  // 点击标点菜单 删除标点类型
  function removeMarkCatalogAction(id: number) {
    selectedMarkCatalogs.value = selectedMarkCatalogs.value.filter((item) => item !== id)
    loadMarkerListsAction()
  }
  // 载入地图上的点位数  据根标点菜单动态过滤
  async function loadMarkerListsAction() {
    markers.value = (await getMarkList(selectedMarkCatalogs.value)) as any
  }

  // 标记模式开启退出
  async function markStatusAction(value:boolean) {
    markStatus.value = value
  }
  // 设置当前标记点坐标
  async function setCurMarkerAction(value:MarkerPosition) {
    curMarker.value = value
  }

  function addMarker(markerData: any) {
    return new Promise((resolve) => {
      markData.push({
        ...markerData,
        id: Date.now(), // 简单的 ID 生成方式，实际项目中可能需要更复杂的逻辑
      })
      resolve(true)
    })
  }

  function DeleteMarker(name:string,x:number,y:number) {
    return new Promise((resolve) => {
      let index = markData.findIndex((item => item.name === name && item.x === x && item.y === y))//查找标记点的索引
      markData.splice(index,1)
      resolve(true)
      loadMarkerListsAction()//删除后重新加载标记点列表
    })
  }

  return {
    mapId,//地图id
    mapName,//地图id
    mapInfo,//地图图片信息
    mapList,//地图列表
    markers,//标记点列表
    selectedMarkCatalogs,//选中的标记点类型
    markStatus,//标记模式开启状态
    curMarker,//当前标记点坐标
    changeMapIdAction,//切换地图
    exportMapInfoAction,//导出地图信息
    loadMapInfoAction,//载入地图图片信息
    loadMapListAction,//加载地图列表
    addMarkCatalogAction,//点击标点菜单 存储标点类型
    removeMarkCatalogAction,//点击标点菜单 删除标点类型
    markStatusAction,//标记模式开启退出
    setCurMarkerAction,//设置当前标记点坐标
    addMarker,
    DeleteMarker
  }
})
