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
      if(data.id){
        $(this.el).prepend('<h1>编辑歌曲</h1>')
      }else{
        $(this.el).prepend('<h1>新建歌曲</h1>')
      }
    },
    reset(){
      this.render({})
    }
  }
  let model ={
    data:{
      name:'',url:'',id:'',singer:''
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
    },
    update(data){
      var song =AV.Object.createWithoutData('Song',this.data.id)
      song.set('name',data.name)
      song.set('link',data.link)
      song.set('singer',data.singer)
      return song.save().then((response)=>{
        Object.assign(this.data,data)
        return response
      })
    }
  }
  let controller = {
    init(view,model){
      this.view = view
      this.model = model
      this.view.init()
      this.view.render(this.model.data)


      window.eventHub.on('select',(data)=>{
        this.model.data = data
        this.view.render(data)
      })

      window.eventHub.on('new',(data)=>{

        if(this.model.data.id){
          this.model.data = {
            name:'',url:'',id:'',singer:''
          }
        }else{
          Object.assign(this.model.data,data)
        }
        this.view.render(this.model.data)

      })

      this.bindEvents()
    },
    update(){
      let needs = 'name singer link'.split(' ')
      let data = {}
      needs.map((string)=>{
        data[string] = this.view.$el.find(`[name="${string}"]`).val()
      })
      this.model.update(data)
                .then(()=>{
                  window.eventHub.emit('update',JSON.parse(JSON.stringify(this.model.data)))
                })
      this.view.render({})
    },
    bindEvents(){
      this.view.$el.on('submit','form',(e)=>{
        e.preventDefault()
        if(this.model.data.id){
            this.update()
        }else{
            this.create()
        }

      })
    },
    create(){
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
    }
  }
  controller.init(view,model)
}
