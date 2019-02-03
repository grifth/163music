
{
  let view = {
    el:'#app',

    render(data){

      $(this.el).append(`<style>.page::before{background:url(${data.song.cover}) center/cover transparent} </style>`);
      $(this.el).find('.cover').attr('src',`${data.song.cover}`)
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
        Object.assign(this.data.song,{...data.attributes})
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
        $(this.view.el).on('click','.icon-wrapper',(e)=>{
            if(this.model.data.playStatus===true){
              this.view.play()
              $('.icon-wrapper').css('border', '0px solid white');
              $('.disc-container').addClass('playing' )
              this.model.data.playStatus = false
            }else{
              this.view.pause()
              $('.icon-wrapper').css('border', '1px solid white');
              $('.disc-container').removeClass('playing' )
              this.model.data.playStatus = true
            }
        })
        let audio = $(this.view.el).find('audio')[0]
      audio.onended=(()=>{
        $('.disc-container').removeClass('playing' )
        this.model.data.playStatus = true
        console.log(111111);
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
