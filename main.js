

function fetchEmployees(employees) {

    var container = $("#container");
    var containerHtml = container.html();
    for (var index = 0; index < employees.length; index++) {
        var employee = employees[index];
        var html = '<section id ="' + employee.id + '">\
                        <div class="item">\
                            <h4>'+ employee.name + '</h4>\
                            <h5>'+ employee.contact + '</h5>\
                            <p>$'+ employee.salary + '</p>\
                        </div>\
                        <button class="dltBtn" onclick="deleteIt('+ employee.id + ')">Delete</button>\
                        <button class="editBtn"  data-toggle="modal" data-target="#myModal" \
                        onclick="editIt('+ employee.id + ')">Edit</button>\
                        <button class="viewBtn" data-toggle="modal" data-target="#myModal2" onclick="viewIt('+ employee.id + ')">View</button>\
                    </section>';

        containerHtml += html;
    }

    container.html(containerHtml);
}
function getEmployeesFromServer() {
    $.get("http://localhost:3000/employees", function (data) {
        var employees = data;
        fetchEmployees(employees)
    })
}
getEmployeesFromServer()

function deleteIt(id) {
    $("#" + id).remove();
    $.ajax({
        url: "http://localhost:3000/employees/" + id,
        type: "DELETE",
        success: function (status) {
            alert(" Employee is deleted successfully.")
        }
    })
}

function editIt(id) {
    if (id == undefined || id === "") {
        $('#employee').val('');
        $('#contact').val('');
        $('#salary').val('');
        $('#employee-id').val('');
    } else {
        $.get("http://localhost:3000/employees/" + id, function (data) {
            $('#employee').val(data.name);
            $('#contact').val(data.contact);
            $('#salary').val(data.salary);
            $('#employee-id').val(id);
        })

    }
}

function viewIt(id) {
    $.get("http://localhost:3000/employees/" + id, function (data) {
        $('#modal2').html(
            data.name + '<br>' + data.contact + '<br>' +
            "$" + data.salary
        )
    })
}

function saveIt() {
    var id = $('#employee-id').val();
    var employe = $('#employee').val();
    var cont = $('#contact').val();
    var sal = $('#salary').val();
    var employeeObj = {
        name: employe,
        contact: cont,
        salary: sal
    }
    if (employe == "" || cont == "" || sal == "") {
        return alert("All input fields must be filled!")
    }

    if (id === null || id === undefined || id === '') {
        $.post("http://localhost:3000/employees/", employeeObj, function () {
            alert("New employee has been added.");

        })
    } else {
        employeeObj = {
            id: id,
            name: employe,
            contact: cont,
            salary: sal
        }
        $.ajax({
            url: "http://localhost:3000/employees/" + id,
            type: "PUT",
            success: function () {
                alert("Employee data has been updated successfully.")

            }
        })
    }

    $("#container").html("");
    getEmployeesFromServer()
    editIt(undefined)
}
// function serverSent() {
//     var server = JSON.stringify(employees);
//     console.log(server);
// }
// serverSent()
