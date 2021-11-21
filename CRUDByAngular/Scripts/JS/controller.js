app.controller('myCtrl', ['$scope', '$http', '$rootScope', '$window', function($scope,$http,$rootScope,$window) {
    $scope.data = {};
    $scope.employees = {};
    $scope.empId=0;
   
    $scope.save = function (data) {
        var btnValue = document.getElementById("btnSave").getAttribute("value");
        if (btnValue==="Save") {
            $http({
                method: 'POST',
                url: '/Home/SaveEmployee',
                datatype: "json",
                data: JSON.stringify(data)
            }).then(function (response) {
                if (response.data > 0) {
                    $scope.GetAllEmployee();
                    alert('Employee save successfully');
                    $scope.data.name = "";
                    $scope.data.phoneNo = "";
                    $scope.data.address = "";
                }
            }, function (response) {
                alert('Data not save');
                console.log(response);
            });
        } else {
            $scope.employee = {};
            $scope.employee.Id = $scope.empId;
            $scope.employee.Name = $scope.data.name;
            $scope.employee.PhoneNo = $scope.data.phoneNo;
            $scope.employee.Address = $scope.data.address;
            console.log($scope.employee);
            $http({
                method: 'POST',
                url: '/Home/UpdateEmployee',
                datatype: "json",
                data: JSON.stringify($scope.employee)
            }).then(function (response) {
                if (response.data > 0) {
                    $scope.GetAllEmployee();
                    alert('Employee update successfully');
                    $scope.GetAllEmployee();
                    $scope.data.name = "";
                    $scope.data.phoneNo = "";
                    $scope.data.address = "";
                    document.getElementById("btnSave").setAttribute("value", "Save");
                    document.getElementById("btnSave").style.backgroundColor = "White";
                }
            }, function (response) {
                alert('Data not update');
                console.log(response);
            });
        }
        
    }

    $scope.GetAllEmployee = function () {
        $http({
            method: "GET",
            url: "/Home/GetAllEmployee"
        }).then(function(response) {
            $scope.employees = response.data;
        }, function() {
            alert("Error Occur");
        });
    }

    $scope.DeleteEmp = function (emp) {
        $http({
            method: "POST",
            url: "/Home/DeleteEmployee",
            dataType: "json",
            params:{'id':emp.Id}
        }).then(function (response) {
            if (response.data>0) {
                alert(emp.Name + " delete successfully");
                $scope.GetAllEmployee();
            }
        }, function () {
            alert("Error Occur");
        });
    }

    $scope.UpdateEmp = function (emp) {
        $scope.empId = emp.Id;
        $scope.data.name = emp.Name;
        $scope.data.phoneNo = emp.PhoneNo;
        $scope.data.address = emp.Address;
        document.getElementById("btnSave").setAttribute("value","Update");
        document.getElementById("btnSave").style.backgroundColor = "Yellow";
    }
    
}]);