{
  let view = {
    el:'.page-2',
    init(){
      this.$el = $(this.el)
    },
    show(){
      this.$el.addClass('active')
    },
    hide(){
      this.$el.removeClass('active')
    },
    render(songList) {
        let html = ''
        let num = 0
        songList.map((song) => {
            num  ++
            if(num<4){
              html += `            
              <a href="./playlist-song.html?id=${song.id}"  class="hot-item">
              <div class="hot-item-num top-three">${num}</div>
              <div class="hot-item-content border">
                  <div class="hot-item-context">
                      <h3>${song.attributes.name}</h3>
                      <p class="textoverflow">     
                       <svg class="icon icon-sq">
                        <use xlink:href="#icon-sq"></use>
                       </svg>' 
                        ${song.attributes.singer}                      </p>
                  </div>
                  <div class="hot-item-play">
                        <svg class="icon icon-play">
                        <use xlink:href="#icon-play"></use>
                      </svg>
                  </div></div></a>`  
            }else{
              html += `            
              <a href="./playlist-song.html?id=${song.id}"  class="hot-item">
              <div class="hot-item-num">${num}</div>
              <div class="hot-item-content border">
                  <div class="hot-item-context">
                      <h3>${song.attributes.name}</h3>
                      <p class="textoverflow">     
                       <svg class="icon icon-sq">
                        <use xlink:href="#icon-sq"></use>
                       </svg>' 
                       ${song.attributes.singer}       
                      </p>
                  </div>
                  <div class="hot-item-play">
                        <svg class="icon icon-play">
                        <use xlink:href="#icon-play"></use>
                      </svg>
                  </div></div></a>`
            }

        })
        $(this.el).find('.hot-content').append(html)
    }
  }

  let model = {
      fetch() {
        var query = new AV.Query('SongList')
        return query.find()
    }
  }

  let controller = {
    init(view,model){
      this.view = view
      this.model = model
      this.view.init()
      this.bindEventHub()
      this.bindEvents()
      this.model.fetch().then((songlist) => {
        this.view.render(songlist)                    
    })
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
