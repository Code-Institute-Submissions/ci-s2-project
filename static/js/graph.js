queue()
    .defer(d3.json, "/videogamesales/ModifiedProjects")
    .await(makeGraphs);

function makeGraphs(error, projectsJson) {

    //Clean projectsJson data
    var videogameSales = projectsJson;

    videogameSales.forEach(function (d) {
        d["Global_Sales"] = +d["Global_Sales"];
        d["NA_Sales"] = +d["NA_Sales"];
        d["JP_Sales"] = +d["JP_Sales"];
        d["Year_of_Release"] = +d["Year_of_Release"];
    });

    //Create a Crossfilter instance
    var ndx = crossfilter(videogameSales);


    //Define Dimensions
    var getName = ndx.dimension(function (d) {
        return d["Name"] ? d["Name"] : "";
    });
    var getPlatform = ndx.dimension(function (d) {
        return d["Platform"] ? d["Platform"] : "";
    });
    //var platformfilter = getPlatform.filter('PS2', 'PS3', 'PS4', 'X360', 'XOne', 'PC')
    var getYear = ndx.dimension(function (d) {
        return d["Year_of_Release"] ? d["Year_of_Release"] : 0;
    });
    console.log(getPlatform);
    var getGenre = ndx.dimension(function (d) {
        return d["Genre"] ? d["Genre"] : "";
    });
   var getPublisher = ndx.dimension(function (d) {
        return d["Publisher"];
    });
    var getGlobalSales = ndx.dimension(function (d) {
        return d["Global_Sales"] ? d["Global_Sales"] : 0;
    });
     var getNASales = ndx.dimension(function (d) {
        return d["NA_Sales"] ? d["NA_Sales"] : 0;
    });
     var getJASales = ndx.dimension(function (d) {
        return d["JP_Sales"] ? d["JP_Sales"] : 0;
    });
    var getDeveloper = ndx.dimension(function (d) {
        return d["Developer"] ? d["Developer"] : "";
    });
    //var getRating = ndx.dimension(function (d) {
        //return d["Rating"];
    //});



    //Calculate metrics
    var groupByName = getName.group();
    var groupByPlatform = getPlatform.group();
    var groupByYear = getYear.group();
    var groupByGenre = getGenre.group();
    var groupByPublisher = getPublisher.group();


    //var PublisherGlobalSales = groupByPublisher.reduceSum(function (d) {
        //return d['Global_Sales'];
    //});
    var GameSales = groupByName.reduceSum(function (d) {
        return d['Global_Sales'];
    });
    var PlatformByGS = groupByPlatform.reduceSum(function (d) {
        return d['Global_Sales'];
    });
    var GlobalSalesgroup = ndx.groupAll().reduceSum(function (d) {
        return d['Global_Sales'];
    });
    //var NASalesgroup  = getNASales.group().reduceSum(function (d) {
        //return d['NA_Sales'];
    //});
    //var JASalesgroup  = getJASales.group().reduceSum(function (d) {
        //return d['JP_Sales'];
    //});

    var YearSales = getYear.group().reduceSum(function (d) {
        return d['Global_Sales'];
    });

    //var groupByDeveloper = getDeveloper.group();


    var all = ndx.groupAll();

    var minDate = getYear.bottom(1)[0]["Year_of_Release"];
    var maxDate = getYear.top(1)[0]["Year_of_Release"];


    //Charts
    var GlobalSalesNum = dc.numberDisplay("#globalsales-number");
    //var NASalesNum = dc.numberDisplay("#NASales-number");
    //var JASalesNum = dc.numberDisplay("#JAS-number");
    var timeChart = dc.lineChart("#time-chart");
    //var SalesChart = dc.barChart("#sales-chart");
    var SalesChart = dc.rowChart("#sales-chart");
    var DeveloperChart = dc.rowChart('#developer-sales');
    var ratingChart = dc.pieChart("#rating-chart");


    genreSelectField = dc.selectMenu('#genre-select')
        .dimension(getGenre)
        .group(groupByGenre);
    YearSelectField = dc.selectMenu('#year-select')
        .dimension(getYear)
        .group(groupByYear);
    PlatformSelectField = dc.selectMenu('#platform-select')
        .dimension(getPlatform)
        .group(groupByPlatform);

    GlobalSalesNum
        .valueAccessor(function (d) {
            return d;
        })
        .group(GlobalSalesgroup)
        .formatNumber(d3.format(".2f"));

    //NASalesNum
    //.valueAccessor(function (d) {
            //return d;
        //})
        //.group(NASalesgroup)
        //.formatNumber(d3.format(".2f"));

    //JASalesNum
    //.valueAccessor(function (d) {
            //return d;
        //})
        //.group(JASalesgroup)
        //.formatNumber(d3.format(".2f"));

    //0timeChart
        //.width(800)
        //.height(200)
        //.margins({top: 10, right: 50, bottom: 30, left: 50})
        //.dimension(getYear)
        //.group(groupByYear)
        //.transitionDuration(500)
        //.x(d3.time.scale().domain([minDate, maxDate]))
        //.elasticY(true)
        //.xAxisLabel("Year")
        //.yAxis().ticks(4);

    timeChart
        .width(1100)
        .height(400)
        .margins({top: 10, right: 50, bottom: 30, left: 50})
        .dimension(getYear)
        .group(YearSales)
        .transitionDuration(500)
        //.x(d3.scale().domain([minDate, maxDate]))
        .x(d3.scale.linear().domain([minDate, maxDate]))
        .elasticY(true)
        .xAxisLabel("Year")
        .yAxis().ticks(6);
        //.tickFormat(d3.time.format("04D"));


    SalesChart
        .ordinalColors(["#2e6f9e"])
        .width(500)
        .height(500)
        .dimension(getPublisher)
        .group(groupByPublisher)
        .xAxis().ticks(5);

   DeveloperChart
        .ordinalColors(["#2e6f9e"])
        .width(500)
        .height(500)
        .dimension(getName)
        .group(GameSales)
        .xAxis().ticks(5);



    ratingChart
        .ordinalColors(["#B0E0E6", "#1E90FF", "	#4682B4", "	#0000FF", "#00008B", "#191970"])
        .height(220)
        .radius(90)
        .innerRadius(40)
        .transitionDuration(1500)
        .dimension(getPlatform)
        .group(PlatformByGS);

    SalesChart.data(function (group) {
    return group.top(20);
    });

    DeveloperChart.data(function (group) {
    return group.top(20);
    });
    dc.renderAll();
}
