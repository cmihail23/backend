const database = require('./database')
const faker = require('@faker-js/faker').fakerRO;

async function recreateDatabase() {
    try {
        const employeesCollectionRef = database.collection('employees');
        if (employeesCollectionRef.size != 0) {
            await database.recursiveDelete(employeesCollectionRef);
        }

        const projectsCollectionRef = database.collection("projects");
        if (employeesCollectionRef.size != 0) {
            await database.recursiveDelete(projectsCollectionRef);
        }

        //now recreate
        for (var i = 0; i < 4; i++) {
            var employee = generateEmployee();
            var addedEmployee = await employeesCollectionRef.add(employee);
            var project = generateProject();
            await projectsCollectionRef.add(project);
        }
    } catch (error) {
        console.error(error)
    }
}

function generateProject() {
    var projectName = faker.company.buzzPhrase();
    var projectDescription = faker.company.catchPhrase();
    var projectStartDate = faker.date.past();
    var projectEndDate = faker.date.future();
    var projectRevenue = faker.number.float({ min: 1000, max: 50000, multipleOf: 10 })

    return {
        "projectName": projectName,
        "projectDescription": projectDescription,
        "projectStartDate": projectStartDate,
        "projectEndDate": projectEndDate,
        "projectRevenue": projectRevenue,
        "employees": []
    }
}

function generateEmployee() {
    var employeeName = faker.person.fullName();
    var employeedDate = faker.date.between({ from: '2020-01-01T00:00:00.000Z', to: '2023-01-01T00:00:00.000Z' });
    var department = faker.commerce.department();
    var employeeEmail = faker.internet.email();
    var employeePhoneNumber = faker.phone.number();
    return {
        "employeeName": employeeName,
        "employeedDate": employeedDate,
        "department": department,
        "employeeEmail": employeeEmail,
        "employeePhoneNumber": employeePhoneNumber
    }
}



module.exports = recreateDatabase;