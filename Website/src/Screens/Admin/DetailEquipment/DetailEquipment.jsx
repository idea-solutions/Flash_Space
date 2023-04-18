import { useState } from "react";
import Footer from "../../../components/Admin/Footer/Footer";
import TopNav from "../../../components/Admin/TopNav/TopNav";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const DetailPermission = () => {
  const { id } = useParams();
  const [equipment, setEquipment] = useState([]);
  const [equipmentname, setEquipmentName] = useState("");
  const navigate = useNavigate();
  axios
    .get(
      `${
        process.env.REACT_APP_URL
          ? `${process.env.REACT_APP_URL}`
          : `http://localhost:8000`
      }/equipment/${id}`
    )
    .then((res) => {
      setEquipment(res.data);
    });
    const editEquipment = async (e) => {
      e.preventDefault();
      const edit = await axios
        .put(
          `${
            process.env.REACT_APP_URL
              ? `${process.env.REACT_APP_URL}`
              : `http://localhost:8000`
          }/equipment/${id}`,
          {
            equipmentname,
          }
        )
        .then(() => {
          navigate("/equipment");
        });
    };
  return (
    <>
      <TopNav />
      <div className="container-scroller">
        <div className="main-panel">
          <div className="content-wrapper">
            <div className="row">
              <div className="col-md-12 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">Chi tiết trang thiết bị</h4>
                    <form className="forms-sample" onSubmit={editEquipment}>
                      <div className="form-group">
                        <label for="exampleInputUsername1">Tên trang thiết bị</label>
                        <input
                          type="text"
                          className="form-control"
                          id="exampleInputUsername1"
                          placeholder="Tên trang thiết bị"
                          onChange={(e) => setEquipmentName(e.target.value)}
                          defaultValue={equipment.equipmentname}
                        />
                      </div>
                      <button type="submit" className="btn btn-primary me-2"
                       onClick={editEquipment}
                      >
                        Cập nhật
                      </button>
                      <Link to={"/equipment"} className="btn btn-light">Cancel</Link>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DetailPermission;
