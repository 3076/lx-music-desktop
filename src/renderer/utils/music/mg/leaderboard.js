import { httpFetch } from '../../request'
import { sizeFormate } from '../../index'


// const boardList = [{ id: 'mg__27553319', name: '咪咕尖叫新歌榜', bangid: '27553319' }, { id: 'mg__27186466', name: '咪咕尖叫热歌榜', bangid: '27186466' }, { id: 'mg__27553408', name: '咪咕尖叫原创榜', bangid: '27553408' }, { id: 'mg__23189800', name: '咪咕港台榜', bangid: '23189800' }, { id: 'mg__23189399', name: '咪咕内地榜', bangid: '23189399' }, { id: 'mg__19190036', name: '咪咕欧美榜', bangid: '19190036' }, { id: 'mg__23189813', name: '咪咕日韩榜', bangid: '23189813' }, { id: 'mg__23190126', name: '咪咕彩铃榜', bangid: '23190126' }, { id: 'mg__15140045', name: '咪咕KTV榜', bangid: '15140045' }, { id: 'mg__15140034', name: '咪咕网络榜', bangid: '15140034' }, { id: 'mg__23217754', name: 'MV榜', bangid: '23217754' }, { id: 'mg__23218151', name: '新专辑榜', bangid: '23218151' }, { id: 'mg__21958042', name: 'iTunes榜', bangid: '21958042' }, { id: 'mg__21975570', name: 'billboard榜', bangid: '21975570' }, { id: 'mg__22272815', name: '台湾Hito中文榜', bangid: '22272815' }, { id: 'mg__22272904', name: '中国TOP排行榜', bangid: '22272904' }, { id: 'mg__22272943', name: '韩国Melon榜', bangid: '22272943' }, { id: 'mg__22273437', name: '英国UK榜', bangid: '22273437' }]

const boardList = [{ id: 'mg__27553319', name: '尖叫新歌榜', bangid: '27553319' }, { id: 'mg__27186466', name: '尖叫热歌榜', bangid: '27186466' }, { id: 'mg__27553408', name: '尖叫原创榜', bangid: '27553408' }, { id: 'mg__23189800', name: '港台榜', bangid: '23189800' }, { id: 'mg__23189399', name: '内地榜', bangid: '23189399' }, { id: 'mg__19190036', name: '欧美榜', bangid: '19190036' }, { id: 'mg__23189813', name: '日韩榜', bangid: '23189813' }, { id: 'mg__23190126', name: '彩铃榜', bangid: '23190126' }, { id: 'mg__15140045', name: 'KTV榜', bangid: '15140045' }, { id: 'mg__15140034', name: '网络榜', bangid: '15140034' }, { id: 'mg__21958042', name: '美国iTunes榜', bangid: '21958042' }, { id: 'mg__21975570', name: '美国billboard榜', bangid: '21975570' }, { id: 'mg__22272815', name: '台湾Hito中文榜', bangid: '22272815' }, { id: 'mg__22272943', name: '韩国Melon榜', bangid: '22272943' }, { id: 'mg__22273437', name: '英国UK榜', bangid: '22273437' }]

export default {
  limit: 200,
  list: [
    {
      id: 'mgyyb',
      name: '音乐榜',
      bangid: '27553319',
    },
    {
      id: 'mgysb',
      name: '影视榜',
      bangid: '23603721',
    },
    {
      id: 'mghybnd',
      name: '华语内地榜',
      bangid: '23603926',
    },
    {
      id: 'mghyjqbgt',
      name: '华语港台榜',
      bangid: '23603954',
    },
    {
      id: 'mgomb',
      name: '欧美榜',
      bangid: '23603974',
    },
    {
      id: 'mgrhb',
      name: '日韩榜',
      bangid: '23603982',
    },
    {
      id: 'mgwlb',
      name: '网络榜',
      bangid: '23604058',
    },
    {
      id: 'mgclb',
      name: '彩铃榜',
      bangid: '23604023',
    },
    {
      id: 'mgktvb',
      name: 'KTV榜',
      bangid: '23604040',
    },
    {
      id: 'mgrcb',
      name: '原创榜',
      bangid: '23604032',
    },
  ],
  getUrl(id, page) {
    return `https://app.c.nf.migu.cn/MIGUM2.0/v1.0/content/querycontentbyId.do?columnId=${id}&needAll=0`
    // return `http://m.music.migu.cn/migu/remoting/cms_list_tag?nid=${id}&pageSize=${this.limit}&pageNo=${page - 1}`
  },
  successCode: '000000',
  requestBoardsObj: null,
  requestObj: null,
  getBoardsData() {
    if (this.requestBoardsObj) this._requestBoardsObj.cancelHttp()
    this.requestBoardsObj = httpFetch('https://app.c.nf.migu.cn/MIGUM3.0/v1.0/template/rank-list/release', {
    // this.requestBoardsObj = httpFetch('https://app.c.nf.migu.cn/MIGUM2.0/v2.0/content/indexrank.do?templateVersion=8', {
      headers: {
        Referer: 'https://app.c.nf.migu.cn/',
        'User-Agent': 'Mozilla/5.0 (Linux; Android 5.1.1; Nexus 6 Build/LYZ28E) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Mobile Safari/537.36',
        channel: '0146921',
      },
    })
    return this.requestBoardsObj.promise
  },
  getData(url) {
    if (this.requestObj) this.requestObj.cancelHttp()
    this.requestObj = httpFetch(url)
    return this.requestObj.promise
  },
  getSinger(singers) {
    let arr = []
    singers.forEach(singer => {
      arr.push(singer.name)
    })
    return arr.join('、')
  },
  filterData(rawData) {
    // console.log(JSON.stringify(rawData))
    // console.log(rawData)
    let ids = new Set()
    const list = []
    rawData.forEach(({ objectInfo: item }) => {
      if (ids.has(item.copyrightId)) return
      ids.add(item.copyrightId)

      const types = []
      const _types = {}
      item.newRateFormats && item.newRateFormats.forEach(type => {
        let size
        switch (type.formatType) {
          case 'PQ':
            size = sizeFormate(type.size)
            types.push({ type: '128k', size })
            _types['128k'] = {
              size,
            }
            break
          case 'HQ':
            size = sizeFormate(type.size)
            types.push({ type: '320k', size })
            _types['320k'] = {
              size,
            }
            break
          case 'SQ':
            size = sizeFormate(type.size)
            types.push({ type: 'flac', size })
            _types.flac = {
              size,
            }
            break
          case 'ZQ':
            size = sizeFormate(type.size)
            types.push({ type: 'flac32bit', size })
            _types.flac32bit = {
              size,
            }
            break
        }
      })

      const intervalTest = /(\d\d:\d\d)$/.test(item.length)

      list.push({
        singer: this.getSinger(item.artists),
        name: item.songName,
        albumName: item.album,
        albumId: item.albumId,
        songmid: item.copyrightId,
        songId: item.songId,
        copyrightId: item.copyrightId,
        source: 'mg',
        interval: intervalTest ? RegExp.$1 : null,
        img: item.albumImgs && item.albumImgs.length ? item.albumImgs[0].img : null,
        lrc: null,
        lrcUrl: item.lrcUrl,
        otherSource: null,
        types,
        _types,
        typeUrl: {},
      })
    })
    return list
  },
  filterBoardsData(rawList) {
    // console.log(rawList)
    let list = []
    for (const board of rawList) {
      if (board.template != 'group1') continue
      for (const item of board.itemList) {
        if ((item.template != 'row1' && item.template != 'grid1' && !item.actionUrl) || !item.actionUrl.includes('rank-info')) continue

        let data = item.displayLogId.param
        list.push({
          id: 'mg__' + data.rankId,
          name: data.rankName,
          bangid: String(data.rankId),
        })
      }
    }
    return list
  },
  async getBoards(retryNum = 0) {
    // if (++retryNum > 3) return Promise.reject(new Error('try max num'))
    // let response
    // try {
    //   response = await this.getBoardsData()
    // } catch (error) {
    //   return this.getBoards(retryNum)
    // }
    // // console.log(response.body.data.contentItemList)
    // if (response.statusCode !== 200 || response.body.code !== this.successCode) return this.getBoards(retryNum)
    // const list = this.filterBoardsData(response.body.data.contentItemList)
    // // console.log(list)
    // // console.log(JSON.stringify(list))
    // this.list = list
    // return {
    //   list,
    //   source: 'mg',
    // }
    this.list = boardList
    return {
      list: boardList,
      source: 'mg',
    }
  },
  getList(bangid, page, retryNum = 0) {
    if (++retryNum > 3) return Promise.reject(new Error('try max num'))
    return this.getData(this.getUrl(bangid, page)).then(({ statusCode, body }) => {
      // console.log(body)
      if (statusCode !== 200 || body.code !== this.successCode) return this.getList(bangid, page, retryNum)
      const list = this.filterData(body.columnInfo.contents)
      return {
        total: list.length,
        list,
        limit: this.limit,
        page,
        source: 'mg',
      }
    })
  },
}
