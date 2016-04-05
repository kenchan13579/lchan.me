
angular.module("myFilters",[])
.filter("properID", function() {
        return function(input) {
            var input = input.replace(/[\/]/g, "").toLowerCase();

            return input;
        }
    })
    .filter("skillAsText", function() {
        return function(value) {
            if (value == 100) {
                return 'Master';
            } else if (value >= 90) {
                return 'Extremely Knowledgeable';
            } else if (value >= 80) {
                return 'Quite Proficient';
            } else if (value >= 70) {
                return 'Proficient';
            } else if (value >= 60) {
                return 'Comfortable';
            } else if (value >= 50) {
                return 'Fairly Comfortable';
            } else if (value >= 40) {
                return 'Knowledgeable';
            } else if (value >= 30) {
                return 'Fairly Knowledgeable';
            } else if (value >= 20) {
                return 'Learning';
            } else if (value >= 10) {
                return 'Slowly Learning';
            } else {
                return 'Incompetent';
            }
        }
    })
