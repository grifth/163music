
{
  let view = {
    el:'#app',
    render(data){
      $(this.el).find('.song-bg').css('background-image',`url(${data.song.cover})`)
      $(this.el).find('img').attr('src',`${data.song.cover}`)
      $(this.el).find('audio').attr('src',`${data.song.link}`)
    },
    play(){
        $(this.el).find('audio')[0].play()
    },
    pause(){
      $(this.el).find('audio')[0].pause()
    }
  }

  let model = {
    data:{
      song:{
        id:'',
        name:'',
        singer:'',
        link:'',
      },
      playStatus:'paused',
    },
    setId(id){
      this.data.id = id
    },
    get(){
      var query = new AV.Query('Song')
      return query.get(this.data.id).then((data)=>{
      this.data.song  = Object.assign({id:data.id},data.attributes)
        return this.data
      })
    }
  }

  let controller = {
    init(view,model){
        this.view = view
        this.model = model
        let id = this.getSongId()
        this.model.setId(id)
        this.model.get().then((song)=>{
          this.view.render(song)
        })
        this.bindEvent()
    },
    bindEvent(){
        $(this.view.el).on('click','.playButton',(e)=>{
            if(this.model.data.playStatus==='paused'){
              $(this.view.el).find('.song-disc-wrap').addClass('active')
              $(this.view.el).find('.song-disc-wrap').addClass('active')
              this.view.play()

              this.model.data.playStatus = 'playing'
            }else{

              this.view.pause()
              $(this.view.el).find('.song-disc-wrap').removeClass('active')
              $(this.view.el).find('.song-disc-wrap').removeClass('active')
              this.model.data.playStatus = 'paused'
            }
        })
        let audio = $(this.view.el).find('audio')[0]
      audio.onended=(()=>{
        console.log(11111);
        $(this.view.el).find('.song-disc-wrap').removeClass('active')
        $(this.view.el).find('.song-disc-wrap').removeClass('active')
        this.model.data.playStatus = 'paused'
      })
    },
    getSongId(){
      let search = window.location.search
      if(search.indexOf('?')===0){
        search = search.substring(1)
      }

      let array = search.split('&').filter((v=>v))
      let id = ''

      for(let i = 0;i<array.length;i++){
        let kv = array[i].split('=')
        let key = kv[0]
        let value = kv[1]
        if(key === 'id'){
          id = value
          break
        }
      }
      return id
    }
  }

  controller.init(view,model)

}
