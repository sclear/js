let str = 'aabbddsssaaa'

function sma() {
    let small = ''
    str.split('').forEach((val, i) => {
        let v = small.charAt( small.length - 1 )
        let v2 = small.charAt( small.length - 2 )
        if (small.length){
            if( val === v ) {
                small += 2
            } else if(/\d/.test( v )) {
                if( v2 === val ) {
                    let num = Number( small.slice(small.length-1, small.length)) 
                    small = small.slice(0, small.length - 1)
                    small += (num+1)
                    console.log(num)
                } 
                else{
                    small += val
                }
            } 
        }
        else {
            small = val
        }
    })
    console.log(small)
}
sma()
