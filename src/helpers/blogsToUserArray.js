export const blogsToUserArray = (blogs) => {
let userMap = {}
    console.log("blogs", blogs)
    blogs.forEach((x) => {
        if(x.user){
            if (userMap[x.user.id]){
                const curVal = userMap[x.user.id]
                userMap[x.user.id] = {...curVal, count: curVal.count + 1, blogs: blogs.concat(x)}
    }
    else {
        userMap[x.user.id] = {name: x.user.name, count: 1, blogs: [x]}
    }
    }
    })
   // console.log("userMap", userMap)
//usermap - id: {name,count, blogs}
    let userArray = Object.keys(userMap).map((k,i) => {
        return {...userMap[k], id:k}
    })

    userArray.sort((a,b) => {
        if (a.count>b.count) {
            return 1
        }
        else if (a.count<b.count){
            return -1
        }
        else {
            return 0
        }
    })
   console.log("userArray",userArray)
   return userArray
}
   
 