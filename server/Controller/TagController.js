import Tag from '../model/TagModel'
class TagController {
    async updateTag(ctx) {
        ctx.body = await Tag.updateTag(ctx.params.id, ctx.request.body.tags)
    }
    async gettags(ctx){
        ctx.body = await Tag.gettags()

    }

}
export default new TagController()