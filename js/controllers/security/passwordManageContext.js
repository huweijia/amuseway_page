app.controller('passwordManageController',['$scope',function($scope) {
    $scope.gridOptions = {
        useExternalPagination: true,
        useExternalSorting: true,
        enableFiltering: false,
        enableSorting: true,
        enableRowHeaderSelection : true,
        enableRowSelection: true,
        enableSelectAll: true,
        enableGridMenu: true,
        enableHorizontalScrollbar:0,
        i18n:'zh-cn',
        rowTemplate:'<div ng-mouseover="rowStyle={\'background-color\': \'#e9ecef\'};" ng-mouseleave="rowStyle={}" >' +
        '<div ng-style="rowStyle" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" ui-grid-one-bind-id-grid="rowRenderIndex + \'-\' + col.uid + \'-cell\'" class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }"' +
        'role="{{col.isRowHeader ? \'rowheader\' : \'gridcell\'}}" ui-grid-cell>' +
        '</div></div>',
        columnDefs: [{
                name: "userName",
                displayName: "用户名",
                enableColumnMenu: false,
                minWidth: '320'
            },
            {
                name: "domain",
                displayName: "域名",
                enableColumnMenu: false,
                width: '*'
            },
            {
                name: "ip",
                displayName: "IP",
                enableColumnMenu: false
            },
            {
                name:"keyword",
                displayName:"关键字",
                enableColumnMenu:false
            },
            {
                name: '操作',
                enableColumnMenu: false,
                enableSorting:false,
                width:'200',
                cellTemplate: '<div class="ui-grid-cell-contents"><div class="dropdown" >' +
                '<button type="button" ng-click="grid.appScope.popPasswordManageEdit(row.entity)" class="btn btn-xs btn-primary"><i class="glyphicon glyphicon-cog"></i>&nbsp;编辑&nbsp;&nbsp;&nbsp;</a></button>&nbsp;' +
                '<button type="button" ng-click="grid.appScope.doPasswordManageDelete(row.entity.id)" class="btn btn-xs btn-danger"><i class="glyphicon glyphicon-trash"></i>&nbsp;删除&nbsp;&nbsp;&nbsp;</a></button></div></div>'
            }
        ],
        onRegisterApi:function(gridApi){
            $scope.gridApi = gridApi;
            $scope.gridApi.core.on.sortChanged(this, function (grid, sortColumns) {
                // $scope.sort = [];
                // angular.forEach(sortColumns, function (sortColumn) {
                //     $scope.sort.push({
                //         dir: sortColumn.sort.direction,
                //         propertyName: sortColumn.name
                //     });
                // }.bind($scope));
                // // this.doPagingSearch();
            }.bind($scope));
            // $scope.gridApi.selection.on.rowSelectionChanged($scope,function(row,event){
            //     // if(row){
            //     //     $scope.checkedRows = $scope.gridApi.selection.getSelectedRows();
            //     // }
            // }.bind($scope));
            // $scope.gridApi.selection.on.rowSelectionChangedBatch($scope,function(row,event){
            //     // if(row){
            //     //     $scope.checkedRows = this.gridApi.selection.getSelectedRows();
            //     // }
            // }.bind($scope));
        }.bind($scope)
    };

}]);