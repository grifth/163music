{
  let view = {
    el:'.page-1',
    init(){
      this.$el = $(this.el)
    },
    show(){
      this.$el.addClass('active')
    },
    hide(){
      this.$el.removeClass('active')
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
      this.loadModule2()
    },
    bindEvents(){

    },
    bindEventHub(){
      eventHub.on('selectTab',(index)=>{
        if(index===0){
          this.view.show()
        }else{
          this.view.hide()
        }
      })
    },
    loadModule2(){
      let script2 = document.createElement('script')
      script2.src = './js/page1-2.js'

      document.body.appendChild(script2)
    },
  }

  controller.init(view,model)

}
