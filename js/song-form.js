{
  let view = {
    el:'.page>main',
    init(){
      this.$el = $(this.el)
    },
    template:`
    <form action="" class="form">
      <div class="row">
        <label for="">
          歌名
        </label>
        <input type="text" name="name" value="__name__">
      </div>
      <div class="row">
        <label for="">
          歌手
        </label>
        <input type="text" name="singer" value="__singer__">
      </div>
      <div class="row">
        <label for="">
          外链
        </label>
        <input type="text" value="__link__" name="link">
      </div>
      <div class="row actions">
        <button type="submit">保存</button>
      </div>
    </form>
    `,
    render(data={}){
      let placeholders = ['name','link','singer','id']
      let html = this.template
      placeholders.map((string)=>{
        html = html.replace(`__${string}__`,data[string]||'')
      })
      $(this.el).html(html)
    },
    reset(){
      this.render({})
    }
  }
  let model ={
    data:{
      name:'',link:''
    },
    create(data){
      var TestObject = AV.Object.extend('Song');
      var song = new TestObject();
      song.set('name',data.name)
      song.set('singer',data.singer)
      song.set('link',data.link)
      return song.save().then((newSong)=>{
        return new Promise((resolve,reject)=>{
          let {id,attributes} = newSong
          Object.assign(this.data,{id,...attributes})
          resolve(newSong)
        })
      },(err)=>{
        console.log(err);
      })
    }
  }
  let controller = {
    init(view,model){
      this.view = view
      this.model = model
      this.view.init()
      this.view.render(this.model.data)
      window.eventHub.on('upload',(data)=>{
        this.model.data = data
        this.view.render(data)
      })
      this.bindEvents()
    },

    bindEvents(){
      this.view.$el.on('submit','form',(e)=>{
        e.preventDefault()
        let needs = 'name singer link'.split(' ')
        let data = {}
        needs.map((string)=>{
          data[string] = this.view.$el.find(`[name="${string}"]`).val()
        })
        this.model.create(data)
            .then((newdata)=>{
              this.view.reset()
              let string = JSON.stringify(newdata)
              let object = JSON.parse(string)
              window.eventHub.emit('submit',undefined)
              window.eventHub.emit('create',object)
            })
      })
    }
  }
  controller.init(view,model)
}