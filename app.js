var app = angular.module('plunker', []);

app.controller('MainCtrl', function($scope) {
  var vm = $scope;
  
  vm.units = 30;
  vm.unitsSold = 0;
  vm.companiesUsed = [];
  vm.totalIncome = 0;
  //dataset being used for testing
  vm.companies = [{
  	name: "A",
    amount: 1,
    price: 1
  }, {
  	name: "B",
    amount: 2,
    price: 5
  }, {
  	name: "C",
    amount: 3,
    price: 8
  }, {
  	name: "D",
    amount: 4,
    price: 9
  }, {
  	name: "E",
    amount: 5,
    price: 10
  }, {
  	name: "F",
    amount: 6,
    price: 17
  }, {
  	name: "G",
    amount: 7,
    price: 17
  }, {
  	name: "H",
    amount: 8,
    price: 20
  }, {
  	name: "I",
    amount: 9,
    price: 24
  }, {
  	name: "J",
    amount: 10,
    price: 30
  }];
  //calculate price per unit
  angular.forEach(vm.companies, function(company) {
    company.pricePerUnit = company.price/company.amount;
  });
  
  vm.reset = function() {
    vm.totalIncome = 0;
    vm.companiesUsed = [];
    vm.unitsSold = 0;
  }
  
  //function used to perform the process of maximizing profits
  vm.maximizeProfits = function() {
    vm.reset();
    var inventory = vm.units;

    var differenceList = vm.companies;
    var maxPrice = 1000;
    while(inventory > 0) {
      //find max price
      maxData = findMaxPriceAndCompanies(differenceList, maxPrice);
      maxPrice = maxData.price;
      //find all companies that have that price
      var tempComps = maxData.companies;
      for(var x = 0; x < tempComps.length; x++) {
        var company = tempComps[x];
        if(company.amount <= inventory) {
          //deduct from total units and save the company
          inventory = inventory - company.amount;
          vm.unitsSold += company.amount;
          vm.companiesUsed.push(company.name);
          vm.totalIncome=vm.totalIncome + company.price;
        }
      }
      //update difference list
      differenceList = calculateDifference(differenceList, tempComps);
    }
  };
  
  function calculateDifference(list1, list2) {
    return list1.filter(function(item1) {
        for(var x = 0; x < list2.length; x++) {
          var item2 = list2[x];
          if(item1.name === item2.name) {
            return false;
          }
        }
        return true;
      });
  }
  
  function findMaxPriceAndCompanies(list, maxPrice) {
    var item0 = list[0];
    var tempMaxPrice = item0.pricePerUnit;
    var usableCompanies = [item0];
    
    for(var x = 1; x < list.length; x++) {
      var company = list[x];
      
      //new max price not found
      if(company.pricePerUnit === tempMaxPrice) {
        usableCompanies.push(company);
      }
      else if(company.pricePerUnit > tempMaxPrice){
        tempMaxPrice = company.pricePerUnit;
        usableCompanies = [company];
      }
    }

    return {
      price: tempMaxPrice,
      companies: usableCompanies
    };
  }
  
});
