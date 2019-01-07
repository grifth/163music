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
      window.eventHub.on('new',(data)=>{
        $(this.view.el).addClass('active')
      })
      window.eventHub.on('submit',(data)=>{
        $(this.view.el).addClass('active')
      })
      window.eventHub.on('select',(data)=>{
        this.deactive()
      })
      $(this.view.el).on('click',()=>{
        window.eventHub.emit('new')
      })
    },
    active(){
      window.eventHub.emit('new',{})
    },
    deactive(){
      $(this.view.el).removeClass('active')
    }
  }
  controller.init(model,view)
}
