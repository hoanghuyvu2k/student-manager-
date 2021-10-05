import Student from "./Student";

const StudentList = ({ studentlist, onDelete, setTrigger, setStudentid }) => {
  return (
    <>
      {studentlist.map((student) => (
        <Student
          key={student.id}
          student={student}
          onDelete={onDelete}
          setTrigger={setTrigger}
          setStudentid={setStudentid}
        />
      ))}
    </>
  );
};

export default StudentList;
