from wifinance import Wifinance
from flask import Flask, request, make_response
from flask_cors import CORS

myWifinance = Wifinance()
app = Flask("wifinance")
CORS(app)

@app.route('/insert', methods=['POST'])
def handle_insert():
    data = request.get_json()

    ret = myWifinance.insert_expenses(data)
    if ret:
        response_data = {'message': 'Success'}
        response = make_response(response_data, 200)
        response.headers['Content-Type'] = 'application/json'
    else:
        response_data = {'message': 'Failed'}
        response = make_response(response_data, 400)
        response.headers['Content-Type'] = 'application/json'

    return response

@app.route('/delete', methods=['POST'])
def handle_delete():
    data = request.get_json()
    print(data)

    if "id" in data and data['id']: 
        id = data['id'] 
        print("id: ", id)
        ret = myWifinance.delete_expenses(id)  
    else:
        ret = False

    if ret:
        response_data = {'message': 'Success'}
        response = make_response(response_data, 200)
        response.headers['Content-Type'] = 'application/json'
    else:
        response_data = {'message': 'Failed'}
        response = make_response(response_data, 400)
        response.headers['Content-Type'] = 'application/json'

    return response

@app.route('/get', methods=['GET'])
def handle_get():
    data = request.get_json()
    print(data)

    if "user_id" in data and data['user_id']: 
        id = data['user_id'] 
        print("id: ", id)
        ret = myWifinance.get_all_expenses(id)  
    else:
        ret = False

    if ret:
        response_data = {'message': 'Success', 'query_data': ret}
        response = make_response(response_data, 200)
        response.headers['Content-Type'] = 'application/json'
        response.body 
    else:
        response_data = {'message': 'Failed'}
        response = make_response(response_data, 400)
        response.headers['Content-Type'] = 'application/json'

    return response


@app.route('/update', methods=['POST'])
def handle_update():
    data = request.get_json()
    print(data)
    
    ret = myWifinance.update_expenses(data)
    if ret:
        response_data = {'message': 'Success'}
        response = make_response(response_data, 200)
        response.headers['Content-Type'] = 'application/json'
    else:
        response_data = {'message': 'Failed'}
        response = make_response(response_data, 400)
        response.headers['Content-Type'] = 'application/json'

    return response

@app.route('/')
def hello():
    return "hello"

if __name__ == "__main__":
    

    app.run(debug=True, port=8080)

    #myWifinance.insert_expenses("testMei",100.00, "visa", "Doordash", "food")
    #myWifinance.update_expenses(4, 'amount', 130.00)
    

    #myWifinance.delete_expenses(3)

    #print(myWifinance.get_all_expenses())

    myWifinance.close_db()
    print("db closed")