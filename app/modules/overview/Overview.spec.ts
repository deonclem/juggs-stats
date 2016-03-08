import 'angular';
import 'angular-mocks';
import '../../services'
import {OverviewController} from './OverviewController';
import {HomeService} from "../../services/HomeService";

describe("Homepage", () =>{
    var $httpBackend: ng.IHttpBackendService,
        $controller: ng.IControllerService,
        ctrl: OverviewController;

    beforeEach(() => {
        angular.mock.module('app.services')
    });

    beforeEach(() => {
        angular.mock.inject(function (_$httpBackend_: ng.IHttpBackendService, _$controller_: ng.IControllerService, _HomeService_: HomeService) {
            $httpBackend = _$httpBackend_;
            $controller = _$controller_;
            ctrl = $controller(OverviewController, {HomeService: _HomeService_});
        })
    });

    it('should pass', () => {
        expect(true).toBe(true);
    });


});
