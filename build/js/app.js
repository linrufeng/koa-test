$(()=>{
    let searchVal = null;
    $('#searchVal').bind('input',val=>{
        let target = $(val.target)
        searchVal = target.val();       
    })
    $('#searchBtn').bind('click',function(){
        $.ajax({
            url:'/test',
            type:"get"
        }).done(res=>{
            console.log(res)
        })
    })
})