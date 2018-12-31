{
  let view = {
    el:'.newSong',
    template:`新建歌曲`,
    render(data){
      $(this.el).html(this.template)
    },
    init(){

    }
  }

  let model = {}
  let controller = {
    init(model,view){
      this.view  = view
      this.model = model
      this.view.render(this.model.data)
      window.eventHub.on('upload',(data)=>{
        this.active()
      })
    },
    active(){
      $(this.view.el).addClass('active')
    }
  }
  controller.init(model,view)
}
