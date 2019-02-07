{
  let view = {
    el:'section.songs',
    init(){
      this.$el  = $(this.el)
    },
    template:`<a class="music" href="./song.html?id={{song.id}}">
    <h3>{{song.name}}</h3>
    <p>
      <svg class="icon icon-sq">
        <use xlink:href="#icon-sq"></use>
      </svg>
      {{song.singer}}
    </p>
    <span class="playButton" >
      <svg class="icon icon-play">
        <use xlink:href="#icon-play"></use>
      </svg>
    </span>
  </a>`,
    render(song){
        let virtualDom = $(this.template.replace('{{song.name}}',song.name).replace('{{song.singer}}',song.singer).replace('{{song.id}}',song.id))
        this.$el.find('div.list').append(virtualDom)
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
        this.data.songs = songs.map((song)=>{
          return Object.assign({id:song.id},song.attributes)
        })
         return this.data.songs
      })
    }
  }
  let controller = {
    init(view,model){
      // alert(1)
      this.view = view
      this.model = model
      this.view.init()
      // alert(2)
      this.model.find().then((data)=>{
        data.map((song)=>{this.view.render(song)})
      })
      // alert(3)
    }
  }
  controller.init(view,model)
}
