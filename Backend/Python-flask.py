from flask import Flask, request, jsonify, session
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS


app = Flask(__name__)
app.secret_key="test"
CORS(app)


SQLALCHEMY_DATABASE_URI = "mysql+mysqlconnector://{username}:{password}@{hostname}/{databasename}".format(
    username="Balaramesh8265",
    password="agaram12345",
    hostname="Balaramesh8265.mysql.pythonanywhere-services.com",
    # databasename="Balaramesh8265$Content_Engine21"
    databasename="Balaramesh8265$Access_management23"
)
app.config["SQLALCHEMY_DATABASE_URI"] = SQLALCHEMY_DATABASE_URI
app.config["SQLALCHEMY_POOL_RECYCLE"] = 299
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)


ACCESS_CONTROL = {
    'A': ['Home', 'About'],
    'B': ['Contact', 'Feedback'],
}


def check_access(user_group, page):
    return page in ACCESS_CONTROL.get(user_group, [])


class Users_list(db.Model):
    __tablename__ = "users"
    user_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_name = db.Column(db.String(100))
    user_email = db.Column(db.String(100))
    user_password = db.Column(db.String(100))
    user_group = db.Column(db.String(100))



@app.route('/registeruser', methods=["POST"])
def create_register_list():
    setdata = Users_list(
        user_name=request.form["user_name"],
        user_email=request.form["user_email"],
        user_password=request.form["user_password"],
        user_group = request.form['user_group']
    )
    db.session.add(setdata)
    db.session.commit()
    return "success"




@app.route('/getRegisterUsersData',methods=['GET'])
def getRegisterData():
    registerDatas = Users_list.query.all()
    return jsonify([
        {"user_id": user.user_id, "user_name": user.user_name, "user_email": user.user_email, "user_password": user.user_password,"user_group":user.user_group}
        for user in registerDatas
    ])

@app.route('/getUsersData/<int:id>',methods=['GET'])
def getUserData(id):
    registerDatas = Users_list.query.filter_by(user_id=id).first()
    if not registerDatas:
        return jsonify({"error": "User not found"}), 404

    if registerDatas.user_group == "A":
        return jsonify(
        {"user_id": registerDatas.user_id, "user_name": registerDatas.user_name, "user_email": registerDatas.user_email, "user_group":registerDatas.user_group,"a_page":['Home', 'About']}
        )

    if registerDatas.user_group == "B":
        return jsonify(
        {"user_id": registerDatas.user_id, "user_name": registerDatas.user_name, "user_email": registerDatas.user_email, "user_group":registerDatas.user_group,"a_page":['Contact', 'Feedback']}
        )


@app.route('/loginUserData',methods=['POST'])
def loginUser():
    loginData = Users_list.query.filter_by(user_email=request.form['Emaildata'],user_password=request.form['Passworddata']).first()

    if loginData is None:
        return "user is not found"

    session['user_id'] = loginData.user_id
    session['user_group'] = loginData.user_group
    return jsonify({'user_email':loginData.user_email,'user_name':loginData.user_name,'user_id':loginData.user_id,"user_group":loginData.user_group})



@app.route('/groupA/<string:page>/<int:id>', methods=["GET"])
def show_page_A(id, page):
    registerDatas = Users_list.query.filter_by(user_id=id).first()

    if not registerDatas:
        return jsonify({'message': '404 Error: User not found'}), 404

    if registerDatas.user_group == "A":
        allowed_pages = ['Home', 'About']

        if page in allowed_pages:
            return jsonify(
                {
                    "user_id": registerDatas.user_id,
                    "user_name": registerDatas.user_name,
                    "user_email": registerDatas.user_email,
                    "user_group": registerDatas.user_group,
                    "a_page": page
                }
            )

    return jsonify({'message': '404 Error: Page not found or Unauthorized access'}), 404

@app.route('/groupB/<string:page>/<int:id>', methods=["GET"])
def show_page_B(id, page):
    registerDatas = Users_list.query.filter_by(user_id=id).first()

    if not registerDatas:
        return jsonify({'message': '404 Error: User not found'}), 404

    if registerDatas.user_group == "B":
        allowed_pages = ['Contact', 'Feedback']

        if page in allowed_pages:
            return jsonify(
                {
                    "user_id": registerDatas.user_id,
                    "user_name": registerDatas.user_name,
                    "user_email": registerDatas.user_email,
                    "user_group": registerDatas.user_group,
                    "a_page": page
                }
            )

    return jsonify({'message': '404 Error: Page not found or Unauthorized access'}), 404




@app.route('/logout', methods=['POST'])
def logout():
    session.pop('user', None)
    return jsonify(message="User logged out successfully"), 200
