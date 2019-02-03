{
  let view = {
    el:'.page-2',
    init(){
      this.$el = $(this.el)
    },
    show(){
      this.$el.show()
    },
    hide(){
      this.$el.hide()
    }
  }

  let model = {

  }

  let controller = {
    init(view,model){
      this.view = view
      this.model = model
      this.view.init()
      this.bindEventHub()
      this.bindEvents()
    },
    bindEvents(){

    },
    bindEventHub(){
      eventHub.on('selectTab',(index)=>{
        if(index===1){
          this.view.show()
        }else{
          this.view.hide()
        }
      })
    }
  }

  controller.init(view,model)

}
