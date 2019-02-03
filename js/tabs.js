{
  let view = {
    el:'#tabs',
    init(){
      this.$el = $(this.el)
    },
    active(item){
      item.addClass('active')
         .siblings().removeClass('active')
    }
  }

  let model = {

  }

  let controller = {
    init(view,model){
      this.view = view
      this.view.init()
      this.model = model
      this.bindEvents()
    },
    bindEvents(){
        this.view.$el.on('click','.tabs-nav > li',(e)=>{
          e.preventDefault()

          let $li =$(e.currentTarget)

          let  index = $li.index()

          this.view.active($li)

          this.bindEventHub(index)
        })
    },
    bindEventHub(index){
        eventHub.emit('selectTab',index)
    }
  }

  controller.init(view,model)

}
