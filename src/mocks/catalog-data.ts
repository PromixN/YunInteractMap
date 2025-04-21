// 默认导出（兼容旧导入方式）
export default [
  // 地点分类
  {
    groupName: '地点',
    catalogs: [
      {
        name: '郡府',
        iconUrl: '/YunInteractMap/icons/origin_8204994_893248.png',
        id: { 
          48: 3266, // 黑风山
          49: 3286, // 黄风岭
          61: 3618  // 火焰山（来自map-data.ts第1117行）
        }
      },
      {
        name: '山门',
        iconUrl: '/YunInteractMap/icons/origin_8204994_899999.png',
        id: { 
          48: 3200, // 黑风山
          49: 3201, // 黄风岭
          61: 3602  // 火焰山（来自map-data.ts第1117行）
        }
      },
      {
        name: '势力',
        iconUrl: '/YunInteractMap/icons/origin_3845393_914461.png',
        id: { 
          48: 3203, // 黑风山
          49: 3204, // 黄风岭
          61: 3605  // 火焰山（来自map-data.ts第1117行）
        }
      },
      {
        name: '市坊',
        iconUrl: '/YunInteractMap/icons/origin_8204994_893252.png',
        id: { 
          48: 3267, // 黑风山
          49: 3287, // 黄风岭
          61: 3619  // 火焰山（来自map-data.ts第1126行）
        }
      }
    ]
  },
  
  // 产业分类
  {
    groupName: '产业',
    catalogs: [
      {
        name: '秘境',
        iconUrl: '/YunInteractMap/icons/origin_8204994_893257.png',
        id: { 
          48: 3268, // 黑风山
          49: 3288, // 黄风岭
          61: 3620  // 火焰山（来自map-data.ts第1135行）
        }
      },
      {
        name: '药园',
        iconUrl: '/YunInteractMap/icons/origin_8204994_925850.png',
        id: { 
          48: 3269, // 黑风山
          49: 3289, // 黄风岭
          61: 3621  // 火焰山（根据map-data.ts模式推断）
        }
      },
      {
        name: '酒楼',
        iconUrl: '/YunInteractMap/icons/origin_8204994_925851.png',
        id: { 48: 3270, 49: 3290, 61: 3622 }
      },
      {
        name: '丹房',
        iconUrl: '/YunInteractMap/icons/origin_8204994_893269.png',
        id: { 48: 3271, 49: 3291, 61: 3623 }
      },
      {
        name: '军务',
        iconUrl: '/YunInteractMap/icons/origin_8204994_893277.png',
        id: { 48: 3273, 49: 3293, 61: 3624 }
      }
    ]
  },
  
  // 装备分类（根据黑风山数据生成）
  {
    groupName: '装备',
    catalogs: [
      {
        name: '珍玩',
        iconUrl: '/YunInteractMap/icons/origin_8204994_925852.png',
        id: { 
          48: 3274, // 黑风山
          49: 3294, // 黄风岭
          61: 3625  // 火焰山（来自map-data.ts装备分类）
        }
      },
      {
        name: '法宝',
        iconUrl: '/YunInteractMap/icons/origin_8204994_901930.png',
        id: { 48: 3275, 49: 3295, 61: 3626 }
      },
      {
        name: '灵宝',
        iconUrl: '/YunInteractMap/icons/origin_8204994_893288.png',
        id: { 48: 3276, 49: 3296, 61: 3627 }
      }
    ]
  },
  
  // 角色分类
  {
    groupName: '角色',
    catalogs: [
      {
        name: '人物',
        iconUrl: '/YunInteractMap/icons/origin_8204994_893244.png',
        id: { 
          48: 3280, // 黑风山
          49: 3298, // 黄风岭
          61: 3630  // 火焰山（根据map-data.ts角色分类推断）
        }
      },
      {
        name: '妖魔',
        iconUrl: '/YunInteractMap/icons/origin_8204994_893312.png',
        id: { 48: 3281, 49: 3304, 61: 3631 }
      },
      {
        name: '灵兽',
        iconUrl: '/YunInteractMap/icons/origin_8204994_925854.png',
        id: { 48: 3282, 49: 3305, 61: 3632 }
      }
    ]
  },
  
  // 特殊地点分类
  {
    groupName: '特殊地点',
    catalogs: [
      {
        name: '竞技场',
        iconUrl: '/YunInteractMap/icons/origin_8204994_893292.png',
        id: { 
          48: 3278, // 黑风山
          49: 3299, // 黄风岭
          61: 3628  // 火焰山（来自map-data.ts特殊地点分类）
        }
      },
      {
        name: '遗迹',
        iconUrl: '/YunInteractMap/icons/origin_8204994_893296.png',
        id: { 48: 3279, 49: 3300, 61: 3629 }
      },
      {
        name: '灵脉',
        iconUrl: '/YunInteractMap/icons/origin_8204994_895605.png',
        id: { 48: 3277, 49: 3301, 61: 3639 }
      },
      {
        name: '山脉',
        iconUrl: '/YunInteractMap/icons/origin_8204994_895603.png',
        id: { 48: 3306, 49: 3307, 61: 3635 } // 示例值，需根据实际数据调整
      }
    ]
  }
]
