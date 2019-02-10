{
  let view = {
    el:'.page-3',
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
    },
    bindEvents(){
      $('#search').on('focus',function(){
          $('#placeholder').text('')

      })
      $('#search').on('blur',function(){
          if($(this).val() === ''){
              $('#placeholder').text('搜索歌曲、歌手、专辑')
          }
      })

    },
    bindEventHub(){
      eventHub.on('selectTab',(index)=>{
        if(index===2){
          this.view.show()
        }else{
          this.view.hide()
        }
      })
    }
  }

  controller.init(view,model)

}
