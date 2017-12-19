function ModalUtil() {}

ModalUtil.createModal = function($modal,url,scope,size,styles,openClass) {
    var options = {
        animation:true,
        templateUrl:url,
        size:size || 'lg',
        keyboard:false,
        windowClass:styles,
        openedClass:openClass
    };
    if(scope) {
        angular.extend(options,{'scope':scope});
    }
    var modal = $modal.open(options);
    modal.opened.then(function() {
        var modalElement = document.querySelector('.modal-dialog [ng-controller]');
        var $modalElement = angular.element(modalElement);
        var modalScope = $modalElement.scope();
        if(modalScope) {
            modalScope.parentContext = scope;
        }
    });
    scope.closeModal = function() {
        modal.dismiss('cancel');
    };
    return modal
};