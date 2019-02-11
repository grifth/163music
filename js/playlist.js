{
    let view = {
        el: '.songs',
        init() {
            this.$el = $(this.el)
        },
        render(songList) {
            let html = ''
            let num = 0
            songList.map((song) => {
                num++  
                html += `            
                <a href="./playlist-song.html?id=${song.id}" class="songs-item">                  
                      <div class="songs-num">${num}</div>                           
                       <div class="songs-content border"> 
                        <div class="songs-content-wrap">                                 
                           <div class="songs-title textoverflow">${song.attributes.name}</div>        <div class="songs-info textoverflow">${song.attributes.singer}</div>
                           </div>                          
                             <div class="songs-play">                      
                                       <i class="icon-play"></i> 
                             </div>                        
                       </div>                   
                 </a>`
            })
            $(this.el).append(html)
        }
    }

    let model = {
        fetch() {
            var query = new AV.Query('SongList')
            return query.find()
        }
    }

    let controller = {
        init(view, model) {
            this.view = view
            this.view.init()
            this.model = model
            this.model.fetch().then((songlist) => {
                this.view.render(songlist)                    
            })
        }

    }

    controller.init(view, model)
}