// node 가 sequelize 를 이용해서 mysql 에 테이블을 생성하거나
// 조작할 수 있는 테이블 모델을 만듭니다
const Sequelize = require('sequelize');
// 아래의 형태로 만들어진 객체를 exports 하고, app.js 에서 가져다 쓸 예정
module.exports = class User extends Sequelize.Model {
    // 테이블 생성 및 초기화 함수
    static init(sequelize) {
        return super.init({
            // 각 컬럼(필드) 정의
            // id 는 자동 증가가 값이므로 여기서 정의하지 않습니다
            name: {
                type: Sequelize.STRING(20),
                allowNull: false,  
                unique: true,
            },
            age: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
            },
            married: {
                type: Sequelize.BOOLEAN,  //0, 1 에서 true,false 로 변경
                allowNull: false,
            },
            comment: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
        }, {
            sequelize,
            timestamps: false, //true이면 자동으로 createdAt, updatedAt 을 생성합니다
            underscored: false, //true이면 위에 생성되는 필드가 created_at 형식이 됩니다
            modelName: 'User',
            tableName: 'users',
            paranoid: false, //true이면 deletedAt 컬럼을 자동 생성합니다
            charset: 'utf8',
            collate: 'utf8_general_ci',
            // createdAt : 레코드 insert 된 시간
            // updatedAt : 레코드 수정 update 된 시간
            // deletedAt : 레코드 삭제 시간 - 실제 데이터를 삭제 되지 않고 시간만 기록
        });
    }
    // 테이블간 관계 설정 함수
    static associate(db){
        db.User.hasMany( db.Comment, { foreignKey: 'commenter', sourceKey: 'id' } );
    }
};