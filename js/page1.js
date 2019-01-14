{
  let view  = {
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

  let model = {}

  let controller = {
    init(view,model){
      this.view = view
      this.view.init()
      this.model = model
      this.bindEventHub()
      this.loadModule2()
    },
    bindEventHub(){
        eventHub.on('selectTab',(tabName)=>{
          if(tabName==='page-1'){
            this.view.show()
          }else{
            this.view.hide()
          }
      })
    },
    loadModule1(){
      let script1 = document.createElement('script')
      script1.src = './js/page-1-1.js'
      script.onload = function(){
        // console.log('okkkkkkkkk');
      }
      document.body.appendChild(script1)
    },
    loadModule2(){
      let script2 = document.createElement('script')
      script2.src = './js/page1-2.js'

      document.body.appendChild(script2)
    },
  }

  controller.init(view,model)
}
