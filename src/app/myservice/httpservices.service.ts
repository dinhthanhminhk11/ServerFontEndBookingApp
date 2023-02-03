import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HttpservicesService {
  private socket: Socket;
  public ListOrders = new BehaviorSubject<any>({})
  private IdHouse= new BehaviorSubject<string>('');
  currentID = this.IdHouse.asObservable();

  private IdHotel= new BehaviorSubject<string>('');
  currentIDHotel = this.IdHotel.asObservable();

  
  private IdPhong= new BehaviorSubject<string>('');
  currentIDPhong= this.IdPhong.asObservable();

  public url = 'https://weathered-wind-3010.fly.dev'
  constructor(private httpRequests: HttpClient) {
    this.socket = io(this.url, { transports: ['websocket', 'polling', 'flashsocket'] })
    if (localStorage.getItem('host')) {
      this.socket.emit('hostIp', JSON.parse(localStorage.getItem('host')!).id)
    }
  }
  API = 'https://weathered-wind-3010.fly.dev/api'
  createHost(dataHost: any): Observable<any[]> {
    return this.httpRequests.post<any[]>(`${this.API}/host/signup`, dataHost)
  }
  signinHost(dataHost: any): Observable<any[]> {
    return this.httpRequests.post<any[]>(`${this.API}/host/signin`, dataHost)
  }
  sendImage(file: any): Observable<any[]> {
    const CLOUDINARY_NAME = "dl4lo9r1y"
    const CLOUDINARY_API = `https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/image/upload`
    const CLOUDINARY_PRESET = "u5cbpgjr"
    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", CLOUDINARY_PRESET)
    return this.httpRequests.post<any[]>(CLOUDINARY_API, formData)
  }

  getHouseByHost(data: any): Observable<any[]>{
    return this.httpRequests.get<any[]>(`${this.API}/getProductsHost/${data.id}`)
  }
  getHotelByHost(data: any): Observable<any[]>{
    return this.httpRequests.get<any[]>(`${this.API}/getHotelHost/${data.id}`)
  }

  getPhongByHotel(data: any): Observable<any[]>{
    return this.httpRequests.get<any[]>(`${this.API}/getPhongByIdHotel/${data.idHotel}`)
  }

  getPhongById(data: any): Observable<any[]>{
    return this.httpRequests.get<any[]>(`${this.API}/getPhongById/${data.id}`)
  }

  getSupplement(): Observable<any[]> {
    return this.httpRequests.get<any[]>(`${this.API}/suplements`)
  }

  getAllTienNghiKs(): Observable<any[]>{
    return this.httpRequests.get<any[]>(`${this.API}/getAllTienNghiKs`)
  }

  getAllTienNghiPhong(): Observable<any[]>{
    return this.httpRequests.get<any[]>(`${this.API}/getAllTienNghiPhong`)
  }

  getAllLoaiGiuong(): Observable<any[]>{
    return this.httpRequests.get<any[]>(`${this.API}/bedroom`)
  }

  getSleepingPlaces(): Observable<any[]> {
    return this.httpRequests.get<any[]>(`${this.API}/sleeping`)
  }
  getCategorys(): Observable<any[]> {
    return this.httpRequests.get<any[]>(`${this.API}/listCategory`)
  }
  getSupplements(listIdSupplements: any): Observable<any[]> {
    return this.httpRequests.post<any[]>(`${this.API}/getsupplements`, listIdSupplements)
  }

  getTienNghiKs(listIdTienNghi: any): Observable<any[]> {
    return this.httpRequests.post<any[]>(`${this.API}/getTienNghiKs`, listIdTienNghi)
  }

  getTienNghiPhong(listIdTienNghi: any): Observable<any[]> {
    return this.httpRequests.post<any[]>(`${this.API}/getTienNghiPhong`, listIdTienNghi)
  }

  getBedroomById(listIdBedRoom: any): Observable<any[]> {
    return this.httpRequests.post<any[]>(`${this.API}/bedroomById`, listIdBedRoom)
  }

  getSleepById(listIdSleeping: any): Observable<any[]> {
    return this.httpRequests.post<any[]>(`${this.API}/sleepingplaces`, listIdSleeping)
  }
  getBathrooms(): Observable<any[]> {
    return this.httpRequests.get<any[]>(`${this.API}/bathrooms`)
  }
  getBathroomById(listIdBath: any): Observable<any[]> {
    return this.httpRequests.post<any[]>(`${this.API}/bathrooms`, listIdBath)
  }
  createPro(dataPro: any): Observable<any[]> {
    return this.httpRequests.post<any[]>(`${this.API}/addProduct`, dataPro)
  }

  createHotel(dataPro: any): Observable<any[]> {
    return this.httpRequests.post<any[]>(`${this.API}/addHotel`, dataPro)
  }

  createPhong(dataPro: any): Observable<any[]> {
    return this.httpRequests.post<any[]>(`${this.API}/addPhong`, dataPro)
  }

  updatePro(dataPro: any): Observable<any[]> {
    return this.httpRequests.post<any[]>(`${this.API}/updateProduct`, dataPro)
  }

  updateHotel(dataHotel: any): Observable<any[]> {
    return this.httpRequests.post<any[]>(`${this.API}/updateHotel`, dataHotel)
  }

  updatePhong(dataPhong: any): Observable<any[]> {
    return this.httpRequests.post<any[]>(`${this.API}/updatePhong`, dataPhong)
  }
  
  listOrder(dataHost: any): Observable<any[]> {
    return this.httpRequests.post<any[]>(`${this.API}/order`, dataHost)
  }

  getAllOrderByHost(data: any): Observable<any[]> {
    return this.httpRequests.get<any[]>(`${this.API}/getAllOrderById/${data.idHost}`)
  }

  getAllOrderAdmin(): Observable<any[]> {
    return this.httpRequests.get<any[]>(`${this.API}/getAllOrder`)
  }

  updateOrder(data: any): Observable<any[]> {
    return this.httpRequests.patch<any[]>(`${this.API}/order/${data.id}`, data)
  }

  updateOrderCancel(data: any): Observable<any[]> {
    return this.httpRequests.patch<any[]>(`${this.API}/ordercancel/${data.id}`, data)
  }

  listOrderNotSeem(data: any): Observable<any[]> {
    return this.httpRequests.post<any[]>(`${this.API}/oderseem`, data)
  }
  updateStatusAccessCancel(data: any) : Observable<any[]> {
    return this.httpRequests.patch<any[]>(`${this.API}/updateStatusAccessCancel/${data.id}`, data)
  }
  connectIpHost() {
    let returnUrl = localStorage.getItem('host');
    this.socket.emit('hostIp', JSON.parse(returnUrl!).id)
  }
  sendOrder(data: any) {
    this.socket.emit('sendorder', data)
  }
  NotificationOrder(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on('orderresponse', (data) => {
        observer.next(data);
      });
    });
  }
  sendConfirm(data: any) {
    this.socket.emit('confirmOrder', data)
  }

  sendCancel(data: any) {
    this.socket.emit('cancelOrder', data)
  }

  sendConfirmCancelAccess(data: any) {
    this.socket.emit('ConfirmCancelAccess', data)
  }
  createOrderFake(data: any): Observable<any[]> {
    return this.httpRequests.post<any[]>(`${this.API}/addorder`, data)
  }
  senNotificationAccess(data: any): Observable<any[]> {
    return this.httpRequests.post<any[]>(`${this.API}/senNotificationAccess`, data)
  }

  senNotificationCancel(data: any): Observable<any[]> {
    return this.httpRequests.post<any[]>(`${this.API}/senNotificationCancel`, data)
  }

  senNotificationRequestCancel(data: any): Observable<any[]> {
    return this.httpRequests.post<any[]>(`${this.API}/senNotificationRequestCancel`, data)
  }

  senNotificationRequestCheckOut(data: any): Observable<any[]> {
    return this.httpRequests.post<any[]>(`${this.API}/senNotificationRequestCheckOut`, data)
  }

  senMailnAccess(data: any): Observable<any[]> {
    return this.httpRequests.post<any[]>(`${this.API}/senMailnAccess`, data)
  }

  checkedOutRoom(data: any): Observable<any[]> {
    return this.httpRequests.post<any[]>(`${this.API}/checkedOutRoom`, data)
  }

  senMailCheckOut(data: any): Observable<any[]> {
    return this.httpRequests.post<any[]>(`${this.API}/senMailCheckOut`, data)
  }

  sendMailComfirmCancelByUserPost(data: any): Observable<any[]> {
    return this.httpRequests.post<any[]>(`${this.API}/sendMailComfirmCancelByUserPost`, data)
  }

  sendMailComfirmCancelByHostPost(data: any): Observable<any[]> {
    return this.httpRequests.post<any[]>(`${this.API}/sendMailComfirmCancelByHostPost`, data)
  }

  createNotiAccess(data: any): Observable<any[]> {
    return this.httpRequests.post<any[]>(`${this.API}/createNotiAccess`, data)
  }


  createNotiCancel(data: any): Observable<any[]> {
    return this.httpRequests.post<any[]>(`${this.API}/createNotiCancel`, data)
  }

  createNotiAccessCancel(data: any): Observable<any[]> {
    return this.httpRequests.post<any[]>(`${this.API}/createNotiAccessCancel`, data)
  }

  createNotiSuccess(data: any): Observable<any[]> {
    return this.httpRequests.post<any[]>(`${this.API}/createNotiSuccess`, data)
  }

  deleteHouseId(data: any): Observable<any[]>{
    return this.httpRequests.delete<any[]>(`${this.API}/deleteProduct/${data.id}`)
  }

  deleteHotelId(data: any): Observable<any[]>{
    return this.httpRequests.delete<any[]>(`${this.API}/deleteHotel/${data.id}`)
  }

  deletePhongId(data: any): Observable<any[]>{
    return this.httpRequests.delete<any[]>(`${this.API}/deletePhong/${data.id}`)
  }

  getCountOrder(data: any): Observable<any[]>{
    return this.httpRequests.get<any[]>(`${this.API}/totalOrder/${data.IdHost}`)
  }

  getAllCountOrder(): Observable<any[]>{
    return this.httpRequests.get<any[]>(`${this.API}/totalAllOrder`)
  }

  getCountOrderProcess(data: any): Observable<any[]>{
    return this.httpRequests.get<any[]>(`${this.API}/totalOrderProcess/${data.IdHost}`)
  }

  getCountAllOrderProcess(): Observable<any[]>{
    return this.httpRequests.get<any[]>(`${this.API}/totalAllOrderProcess`)
  } 

  getCountOrderFinish(data: any): Observable<any[]>{
    return this.httpRequests.get<any[]>(`${this.API}/totalOrderFinish/${data.IdHost}`)
  }

  getCountAllOrderFinish(): Observable<any[]>{
    return this.httpRequests.get<any[]>(`${this.API}/totalAllOrderFinish`)
  }

  getCountOrderFail(data: any): Observable<any[]>{
    return this.httpRequests.get<any[]>(`${this.API}/totalOrderFail/${data.IdHost}`)
  }
  getCountAllOrderFail(): Observable<any[]>{
    return this.httpRequests.get<any[]>(`${this.API}/totalAllOrderFail`)
  }
  getTimeOrder(data: any): Observable<any[]>{
    return this.httpRequests.get<any[]>(`${this.API}/getTimeOrder/${data.IdHost}`)
  }
  getAllTimeOrder(): Observable<any[]>{
    return this.httpRequests.get<any[]>(`${this.API}/getAllTimeOrder`)
  }

  getPriceWaiting(data: any): Observable<any[]>{
    return this.httpRequests.get<any[]>(`${this.API}/getPriceWaiting/${data.IdHost}`)
  }

  getPriceAdminWaiting(): Observable<any[]>{
    return this.httpRequests.get<any[]>(`${this.API}/getPriceAdminWaiting`)
  }

  getPriceDay(data: any): Observable<any[]>{
    return this.httpRequests.get<any[]>(`${this.API}/getPriceDayOrder/${data.IdHost}`)
  }

  getTotalPriceAdmin(): Observable<any[]>{
    return this.httpRequests.get<any[]>(`${this.API}/getTotalPriceAdmin`)
  }
  getPriceLastDay(data: any): Observable<any[]>{
    return this.httpRequests.get<any[]>(`${this.API}/getPriceDayLastOrder/${data.IdHost}`)
  }
  getPriceWeek(data: any): Observable<any[]>{
    return this.httpRequests.get<any[]>(`${this.API}/getPriceWeekOrder/${data.IdHost}`)
  }
  getPriceMonth(data: any): Observable<any[]>{
    return this.httpRequests.get<any[]>(`${this.API}/getPriceMonthOrder/${data.IdHost}`)
  }
  getPriceYear(data: any): Observable<any[]>{
    return this.httpRequests.get<any[]>(`${this.API}/getPriceYearOrder/${data.IdHost}`)
  }

  getPriceSearch(IdHost: any,startDay: any, endDay: any): Observable<any[]>{
    return this.httpRequests.get<any[]>(`${this.API}/getPriceOrder/${IdHost}&${startDay}&${endDay}`)
  }

  getPriceSearchAdmin(startDay: any, endDay: any): Observable<any[]>{
    return this.httpRequests.get<any[]>(`${this.API}/getPriceAdminOrder/${startDay}&${endDay}`)
  }

  changeIdHouse(IdHouse: string) {
    this.IdHouse.next(IdHouse)
  }

  getIdHotel(IdHotel: string){
    this.IdHotel.next(IdHotel)
  }
  getIdPhong(IdPhong: string){
    this.IdPhong.next(IdPhong)
  }


  getProductId(data: any): Observable<any[]>{
    return this.httpRequests.get<any[]>(`${this.API}/listProduct/${data.id}`)
  }

  getHotelById(data: any): Observable<any[]>{
    return this.httpRequests.get<any[]>(`${this.API}/getHotelByIdWeb/${data.id}`)
  }

  getFeedbackId(data: any): Observable<any[]>{
    return this.httpRequests.get<any[]>(`${this.API}/listFeedBack/${data.idHouse}`)
  }

  getUserId(data: any): Observable<any>{
    return this.httpRequests.get<any>(`${this.API}/getUser/${data.idUser}`)
  }


  // getListHost
  getAllHost() : Observable<any[]>{
    return this.httpRequests.get<any[]>(`${this.API}/getAllHost`)
  }

  getCountHotelById(data: any): Observable<any>{
    return this.httpRequests.get<any>(`${this.API}/getCountHotelById/${data.idUser}`)
  }

  confirmHotel(data: any): Observable<any>{
    return this.httpRequests.get<any>(`${this.API}/confirmHotel/${data.id}&${data.check}`)
  }

  // user
  getAllUser() : Observable<any[]>{
    return this.httpRequests.get<any[]>(`${this.API}/getAllUser`)
  }

  lockAccount(id: any,reason: any): Observable<any>{
    return this.httpRequests.get<any>(`${this.API}/lockAccountUser/${id}&${reason}`)
  }

  unLockAccount(id: any): Observable<any>{
    return this.httpRequests.get<any>(`${this.API}/unLockAccountUser/${id}`)
  }
}