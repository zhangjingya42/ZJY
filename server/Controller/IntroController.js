
import Introduction from '../model/IntroductionModel'

class IntroControllers {

    async getIntroductions(ctx) {
        ctx.body =  await Introduction.getIntroductions()
    }
}

export default new IntroControllers()
