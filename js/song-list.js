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
      let liList = songs.map((song)=> $('<li></li>').text(song.name))
      let $el = $(this.el)
      $el.find('ul').empty()
      liList.map((domLi)=>{
        $el.find('ul').append(domLi)
      })
    },
    clearActive(){
      $(this.el).find('.active').removeClass('active')
    }
  }

  let model = {
    data:{
      songs:[
      ]
    }
  }
  let controller = {
    init(model,view){
      this.view  = view
      this.model = model
      this.view.render(this.model.data)
      window.eventHub.on('upload',()=>{
        this.view.clearActive()
      })
      window.eventHub.on('create',(data)=>{
        this.model.data.songs.push(data)
        this.view.render(this.model.data)
      })
    }
  }
  controller.init(model,view)
}
