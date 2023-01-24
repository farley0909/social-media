import { prisma } from "../../../database";

async function test(){
    let res = await prisma.user.findMany({})
    console.log(res)
}
test()