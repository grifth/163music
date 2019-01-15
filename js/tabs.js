{
  let view = {
    el:'#tabs',
    init(){
      this.$el = $(this.el)
    }
  }

  let model = {}

  let controller = {
    init(view,model){
      this.view = view
      this.view.init()
      this.model = model
      this.bindEvents()
    },
    bindEvents(){
      this.view.$el.on('click','.tabs-nav>li',(e)=>{
        let $li = $(e.currentTarget)
        let pageName = $li.attr('data-tab-name')
        console.log(pageName);
        eventHub.emit('selectTab',pageName)
        $li.addClass('active')
           .siblings().removeClass('active')
      })
    }
  }
  controller.init(view,model)
}