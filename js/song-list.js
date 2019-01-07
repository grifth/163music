{
  let view = {
    el:'#songList-container',
    template:`
    <ul class="songList">

    </ul>
    `,
    render(data){
      $(this.el).html(this.template)
      let {songs} = data
      let liList = songs.map((song)=> $('<li></li>').text(song.name).attr('data-id',song.id))
      let $el = $(this.el)
      $el.find('ul').empty()
      liList.map((domLi)=>{
        $el.find('ul').append(domLi)
      })
    },
    activeItem(li){
      let $li = $(li)
      $li.addClass('active')
          .siblings('.active').removeClass('active')
    },
    clearActive(){
      $(this.el).find('.active').removeClass('active')
    }
  }

  let model = {
    data:{
      songs:[
      ]
    },
    find(){
      var query = new AV.Query('Song')
      return query.find().then((songs)=>{
        this.data.songs = songs.map((song)=>{
          return {id:song.id,...song.attributes}
        })
        return songs
      })
    }
  }
  let controller = {
    init(model,view){
      this.view  = view
      this.model = model
      this.view.render(this.model.data)

      this.getAllSong()

      this.bindEventHub()

      this.bindEvents()
    },
    getAllSong(){
      this.model.find().then(()=>{
        this.view.render(this.model.data)
      })
    },
    bindEventHub(){
      window.eventHub.on('create',(data)=>{
        this.model.data.songs.push(data)
        this.view.render(this.model.data)
      })
      window.eventHub.on('new',()=>{
        this.view.clearActive()
      })
    },
    bindEvents(){
        $(this.view.el).on('click','li',(e)=>{
          this.view.activeItem(e.currentTarget)
          let songId = e.currentTarget.getAttribute('data-id')
          let data
          let songs = this.model.data.songs
          for(let i = 0;i<songs.length;i++){
            if(songs[i].id === songId){
              data = songs[i]
              break
            }
          }
          window.eventHub.emit('select',JSON.parse(JSON.stringify(data)))
        })
    }
  }
  controller.init(model,view)
}
