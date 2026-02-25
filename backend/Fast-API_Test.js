// Test Script for Postman to validate the response of a backend API
//Link 👉 https://racan0.postman.co/workspace/Racan-Workspace~82035b65-5ac7-4d5e-8ae0-971204b87602/request/43115907-e1dcf88b-8af7-43b4-bdad-56667987c1f6?action=share&creator=43115907&ctx=documentation

// Test 1: Validate response status is 200
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

// Test 2: Validate response body is valid JSON
pm.test("Response is valid JSON", function () {
    pm.response.to.be.json;
});

// Test 3: Validate response contains "Ping" property with value "Pong"
pm.test("Response contains Ping property with value Pong", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property("Ping");
    pm.expect(jsonData.Ping).to.eql("Pong");
});

// Test 4: Validate response time is less than 500ms
pm.test("Response time is less than 500ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(500);
});

if (pm.response.code != 200) {
    pm.test("Log error message for non-200 status", function () {
        console.log("Error: Received status code " + pm.response.code);
    });
}else {
    pm.test("Log success message for 200 status", function () {
        console.log("Success: Received status code 200");
    });
}