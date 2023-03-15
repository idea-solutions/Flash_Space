import "./Order.css";
import TopNav from "../../../components/TopNav/TopNav";
import Footer from "../../../components/Footer/Footer";
import { Link } from "react-router-dom";
const Order = () => {
  return (
    <div>
      <TopNav />
      <div className="bodydth">
        <div class="container">
          <div class="row gutters">
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div class="card" style={{ height: "800px" }}>
                <div class="card-header text-primary">
                  Kiểm tra thông tin của bạn trước khi xác nhận đặt phòng
                </div>
                <div class="card-body p-0">
                  <div class="invoice-container">
                    <div class="invoice-header">
                      <div class="row gutters">
                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 text-start">
                          <a
                            href="index.html"
                            class="btn text-warning"
                            style={{ fontSize: "30px" }}
                          >
                            FLASH SPACE
                          </a>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-6">
                          <address class="text-end">
                            435 Điện biên Phủ , phường 11, Quận Bình Thạnh
                            <br />
                            Hồ chí Minh, Việt Nam
                            <br />
                            123123123123
                          </address>
                        </div>
                      </div>
                      <div class="row gutters">
                        <div class="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
                          <div class="invoice-details">
                            <address className="text-primary">
                              Nguyễn Văn Chuẩn
                              <br />
                              181/7 Liên Tỉnh 5, phường 5, Quận 8, TP.HCM
                              <br />
                              0372417574
                            </address>
                          </div>
                        </div>
                        <div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                          <div class="invoice-details">
                            <div class="invoice-num text-primary">
                              <div>Mã hóa đơn: #1232132131</div>
                              <div>Ngày 18 tháng 03 năm 2023</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="invoice-body">
                      <div class="row gutters">
                        <div class="col-lg-12 col-md-12 col-sm-12">
                          <div class="table-responsive">
                            <table class="table custom-table m-0">
                              <thead>
                                <tr>
                                  <th>Tên phòng</th>
                                  <th>Mã Phòng</th>
                                  <th>thời gian</th>
                                  <th>giá tiền</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>Phòng thuê quận 8</td>
                                  <td>#50000981</td>
                                  <td>09h00 {"->"} 10h00</td>
                                  <td>250 000 VNĐ</td>
                                </tr>
                                <tr>
                                  <td>Phòng thuê quận 8</td>
                                  <td>#50000981</td>
                                  <td>10h00 {"->"} 11h00</td>
                                  <td>250 000 VNĐ</td>
                                </tr>
                                <tr>
                                  <td>&nbsp;</td>
                                  <td colspan="2">
                                    <p>
                                      Tổng tiền
                                      <br />
                                      Chi phí phát xin
                                      <br />
                                    </p>
                                    <h5 class="text-success">
                                      <strong>Tổng tiền</strong>
                                    </h5>
                                  </td>
                                  <td>
                                    <p>
                                      250 000 VNĐ
                                      <br />
                                      0 VNĐ
                                      <br />
                                    </p>
                                    <h5 class="text-success">
                                      <strong>500 000 VNĐ</strong>
                                    </h5>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="card-footer text-end">
                  <Link
                    to={"/infouser"}
                    className="btn btn-primary btn-lg btn-radius m-1"
                  >
                    Thay đổi thay tin cá nhân
                  </Link>
                  <Link className="btn btn-success btn-lg btn-radius m-1">
                    Đặt phòng
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Order;