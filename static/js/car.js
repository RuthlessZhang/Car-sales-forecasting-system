$(document).ready(function (){
    $("#search-btn").click(function (event){
        event.preventDefault();
        var carName = $("#carNameInput").val();
        $.ajax({
            url:"/search?carName="+carName,
            method:"GET",
            success:function(response){
                displayCars(response);
            },
            error:function(xhr,status,error){
                alert("搜索失败，请重试！")
            }
        });
    });
});


function displayCars(carData) {
    var container = $("#carListContainer");
    container.empty();
    if (carData) {
        // 创建图片所在的列，并添加透明边框类
        var imageDiv = $("<div>").addClass("col-md-6 mb-4 transparent-border");
        imageDiv.html(`
            <div class="card">
                <img src="${carData.image_url}" class="card-img-top" alt="汽车图片">
            </div>
        `);

        // 创建参数所在的列，并添加透明边框类
        var infoDiv = $("<div>").addClass("col-md-6 mb-4 transparent-border");
        infoDiv.html(`
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${carData.carName}</h5>
                    <p class="card-text m-3">制造商: ${carData.manufacturer}元</p>
                    <p class="card-text m-3">产地: ${carData.origin}</p>
                    <p class="card-text m-3">品牌: ${carData.brand}</p>
                    <p class="card-text m-3">发动机: ${carData.engine}</p>
                    <p class="card-text m-3">油耗: ${carData.fuel_consumption}</p>
                </div>
            </div>
        `);

        // 创建一个行来包含这两个列
        var rowDiv = $("<div>").addClass("row");
        rowDiv.append(imageDiv);
        rowDiv.append(infoDiv);

        // 将行添加到容器中
        container.append(rowDiv);
    } else {
        container.html("<p>未找到相关汽车信息。</p>");
    }
}