{
  let view = {
    el:'section.songs',
    init(){
      this.$el  = $(this.el)
    },
    template:`<li>
    <h3>{{song.name}}</h3>
    <p>
      <svg class="icon icon-sq">
        <use xlink:href="#icon-sq"></use>
      </svg>
      {{song.singer}}
    </p>
    <a class="playButton" href="./song.html?id={{song.id}}">
      <svg class="icon icon-play">
        <use xlink:href="#icon-play"></use>
      </svg>
    </a>
  </li>`,
    render(song){
        let virtualDom = $(this.template.replace('{{song.name}}',song.name).replace('{{song.singer}}',song.singer).replace('{{song.id}}',song.id))
        this.$el.find('ol.list').append(virtualDom)
    }
  }
  let model ={
    data:{
        songs:[]
    },
    find(){
      var query = new AV.Query('Song')
      return query.find().then((songs)=>{
         // this.data.songs = songs.map((song)=>{
         //   return {id:song.id,...song.attributes}
         // })
         songs.map((song)=>{
           this.data.songs.push({id:song.id,...song.attributes})
         })
         return this.data.songs
      })
    }
  }
  let controller = {
    init(view,model){
      this.view = view
      this.model = model
      this.view.init()
      this.model.find().then((data)=>{
        data.map((song)=>{this.view.render(song)})
      })
    }
  }
  controller.init(view,model)
}
