import React from "react";
import PropTypes from "prop-types";
import { MdClose } from "react-icons/md";

const styles = {
  card: {
    position: "absolute",
    top: "20px",
    left: "0",
    width: "25%",
    height: "100%",
    padding: "2rem",
    margin: "2rem",
    backgroundColor: "#fef9ef",
    borderRadius: "1rem",
  },
  cardCloseBtn: {
    position: "absolute",
    top: "20px",
    right: "10px",
    width: "30px",
    height: "30px",
    color: "#227c9d",
    backgroundColor: "#fef9ef",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "2px solid #227c9d",
    cursor: "pointer",
  },
  cardHeader: {
    textAlign: "center",
    marginBottom: "1rem",
  },
  cardImg: {
    width: "80px",
    borderRadius: "1rem",
  },
  cardName: {
    marginTop: "1rem",
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  cardRole: {
    margin: "1rem 0",
    fontSize: "1.2rem",
  },
  cardBody: {
    marginTop: "1rem",
    display: "flex",
    justifyContent: "space-evenly",
    flexDirection: "column",
  },
  cardBodyTeamMembers: {
    marginTop: "1rem",
    height: "60vh",
    overflowY: "scroll",
  },
  cardItem: {
    width: "100%",
    margin: "0.5rem 0",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "0.9rem",
  },
  cardItemLabel: {
    margin: "0.5rem 0",
    fontWeight: "bold",
  },
  cardItemValue: {
    textAlign: "justify",
  },
  cardItemTeam: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  cardItemImg: {
    width: "50px",
    height: "50px",
    margin: "0.2rem",
    borderRadius: "50%",
  },
  cardItemName: {
    marginLeft: "0.5rem",
    fontWeight: "bold",
  },
  cardItemRole: {
    fontSize: "0.8rem",
    marginLeft: "0.5rem",
  },
};

const EmployeeDetailsCard = (props) => {
  const { employee, employees, handleClose } = props;

  if (!employee) {
    return <div>No employee data available</div>;
  }

  return (
    <div style={styles.card}>
      <button style={styles.cardCloseBtn} onClick={handleClose}>
        <MdClose />
      </button>
      {employee.team === "" ? (
        <div>
          <div style={styles.cardHeader}>
            <img
              style={styles.cardImg}
              src={employee.imageUrl}
              alt="Profile"
            />
            <h2 style={styles.cardName}>{employee.name}</h2>
            <p style={styles.cardRole}>{employee.positionName}</p>
          </div>
          <div style={styles.cardBody}>
            <div style={styles.cardItem}>
              <p style={styles.cardItemLabel}>Phone:</p>
              <p style={styles.cardItemValue}>{employee.phone}</p>
            </div>
            <div style={styles.cardItem}>
              <p style={styles.cardItemLabel}>Email:</p>
              <p style={styles.cardItemValue}>{employee.email}</p>
            </div>
            <div style={styles.cardItem}>
              <p style={styles.cardItemLabel}>Location:</p>
              <p style={styles.cardItemValue}>{employee.location}</p>
            </div>
            {employee.department && (
              <div style={styles.cardItem}>
                <p style={styles.cardItemLabel}>Department:</p>
                <p style={styles.cardItemValue}>{employee.department}</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <div style={styles.cardHeader}>
            <h2>{employee.team} Team</h2>
          </div>
          <h4>Team Members:</h4>
          <div style={styles.cardBodyTeamMembers}>
            {employees
              .filter((emp) => emp.parentId === employee.id.toString())
              .map((emp) => (
                <div style={styles.cardItemTeam} key={emp.id}>
                  <img
                    style={styles.cardItemImg}
                    src={emp.imageUrl}
                    alt="Profile"
                  />
                  <p style={styles.cardItemName}>{emp.name}</p>
                  <p style={styles.cardItemRole}>{emp.positionName}</p>
                </div>
              ))}
          </div>
        </div>
      )}
      <div style={styles.cardItem}>
        <p style={styles.cardItemLabel}>Description:</p>
        <p style={styles.cardItemValue}>{employee.description}</p>
      </div>
    </div>
  );
};

EmployeeDetailsCard.defaultProps = {
  employee: null,
  employees: [],
  handleClose: () => {},
};

EmployeeDetailsCard.propTypes = {
  employee: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    positionName: PropTypes.string,
    imageUrl: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
    location: PropTypes.string,
    department: PropTypes.string,
    team: PropTypes.string,
    description: PropTypes.string,
    parentId: PropTypes.string,
  }),
  employees: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      positionName: PropTypes.string,
      imageUrl: PropTypes.string,
      parentId: PropTypes.string,
    })
  ),
  handleClose: PropTypes.func,
};

export default EmployeeDetailsCard;
