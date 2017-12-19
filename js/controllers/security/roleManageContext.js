app.controller('roleManageController',['$scope','$modal',function($scope,$modal) {
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
            name: "roleName",
            displayName: "角色名称",
            enableColumnMenu: false,
            minWidth: '320'
        },
            {
                name: "roleCode",
                displayName: "角色标识",
                enableColumnMenu: false,
                width: '*'
            },
            {
                name: "userCount",
                displayName: "用户数量",
                enableColumnMenu: false,
                width: '*'
            },
            {
                name: "roleDes",
                displayName: "角色描述",
                enableColumnMenu: false,
                width: '*'
            },
            {
                name: '操作',
                enableColumnMenu: false,
                enableSorting:false,
                width:'200',
                cellTemplate: '<div class="ui-grid-cell-contents"><div class="dropdown" >' +
                '<button type="button" ng-click="grid.appScope.popResourceManageDestribute(row.entity)" class="btn btn-xs btn-default"><i class="glyphicon glyphicon-paperclip"></i>&nbsp;分配&nbsp;&nbsp;&nbsp;</a></button>&nbsp;' +
                '<button type="button" ng-click="grid.appScope.popResourceManageEdit(row.entity)" class="btn btn-xs btn-primary"><i class="glyphicon glyphicon-cog"></i>&nbsp;编辑&nbsp;&nbsp;&nbsp;</a></button>&nbsp;' +
                '<button type="button" ng-click="grid.appScope.doRsourceManageDelete(row.entity.id)" class="btn btn-xs btn-danger"><i class="glyphicon glyphicon-trash"></i>&nbsp;删除&nbsp;&nbsp;&nbsp;</a></button></div></div>'
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
    $scope.popRoleManageAdd = function() {
        var roleManageAddModal = ModalUtil.createModal($modal,'./tpl/security/security_rolemanage_add.html',$scope);
    };
}]);