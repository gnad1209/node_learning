// using DAWEB.Models;
// using System;
// using System.Collections.Generic;
// using System.Linq;
// using System.Web;
// using System.Web.Mvc;
// using System.Data.Entity;
// using System.Net;
// using System.Data;




// namespace DAWEB.Areas.Admin.Controllers
// {
//     public class SanPhamController : Controller
//     {
//         WebDataEntities3 db = new WebDataEntities3();
//         // GET: Admin/SanPham
//         public ActionResult Index()
//         {
//             List<SanPham> lst = db.SanPham.ToList();
//             ViewBag.IdSP = new SelectList(db.DanhMucSanPham, "Id", "Name");
//             return View(lst);
//         }

//         public ActionResult Create()
//         {
//             ViewBag.IdSP = new SelectList(db.DanhMucSanPham, "Id", "Name");

//             return View();
//         }

//         // POST: Admin/Products/Create
//         // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
//         // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
//         [HttpPost]
//         [ValidateAntiForgeryToken]
//         public ActionResult Create([Bind(Include = "Id,images,Name,Gia,Giamgia,IdSP,TB,Mota")] SanPham SP)
//         {
//             if (ModelState.IsValid)
//             {
//                 try
//                 {

//                     string fileName = "";
//                     var f = Request.Files["fileImg"];
//                     if (f != null && f.ContentLength > 0)
//                     {
//                         string[] ext = f.FileName.Split('.');
//                         fileName = DateTime.Now.ToString("yyyyMMddHHmmssffff") + "." + ext[ext.Length - 1];
//                         string path = Server.MapPath("~/Images/" + fileName);
//                         f.SaveAs(path);
//                     }
//                     ViewBag.fileName = fileName;
//                     SP.images = fileName;
//                     db.SanPham.Add(SP);
//                     db.SaveChanges();

//                     return RedirectToAction("Index");
//                 }
//                 catch (Exception ex)
//                 {
//                     ViewBag.Message = ex.ToString();
//                 }
//             }
//             ViewBag.categoryID = new SelectList(db.SanPham, "Id", "name", SP.Id);
//             return View(SP);
//         }


//         public ActionResult Delete(int ID)
//         {
//             // lấy dữ liệu của Category theo Id tương ứng
//             SanPham obj = db.SanPham.Find(ID);
//             return View(obj);
//         }
//         public ActionResult DeleteByID(int ID)
//         {
//             SanPham obj = db.SanPham.Find(ID);
//             db.SanPham.Remove(obj);
//             db.SaveChanges();
//             return RedirectToAction("Index");
//         }


//         public ActionResult Edit(int? ID)
//         {
//             if (ID == null)
//             {
//                 return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
//             }
//             SanPham SP = db.SanPham.Find(ID);

//             if (SP == null)
//             {
//                 return HttpNotFound();
//             }
//             ViewBag.IdSP = new SelectList(db.DanhMucSanPham, "Id", "Name", SP.IdSP);
//             return View(SP);
//         }

//         // POST: Admin/Products/Edit/5
//         // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
//         // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
//         [HttpPost]
//         [ValidateAntiForgeryToken]
//         public ActionResult Edit([Bind(Include = "Id,images,Name,Gia,Giamgia,IdSP,TB,Mota")] SanPham SP)
//         {
//             if (ModelState.IsValid)
//             {
//                 try
//                 {

//                     string fileName = "";
//                     var f = Request.Files["fileImg"];
//                     if (f != null && f.ContentLength > 0)
//                     {
//                         string[] ext = f.FileName.Split('.');
//                         fileName = DateTime.Now.ToString("yyyyMMddHHmmssffff") + "." + ext[ext.Length - 1];
//                         string path = Server.MapPath("~/images/" + fileName);
//                         f.SaveAs(path);
//                     }
//                     SP.images = fileName;
//                     db.Entry(SP).State = EntityState.Modified;
//                     db.SaveChanges();

//                     return RedirectToAction("Index");
//                 }
//                 catch (Exception ex)
//                 {
//                     ViewBag.Message = ex.ToString();
//                 }
//                 return RedirectToAction("Index");
//             }
//             ViewBag.categoryID = new SelectList(db.SanPham, "id", "name", SP.Id);
//             return View(SP);
//         }



//         //public ActionResult Edit(int ID)
//         //{
//         //    // lấy dữ liệu của Category theo Id tương ứng
//         //    SanPham SP = db.SanPham.Find(ID);
//         //    return View(SP);
//         //}
//         //public ActionResult EditbyID(SanPham SP)
//         //{
//         //    // lấy dữ liệu của Category theo Id tương ứng
//         //    var f = Request.Files["fileImg"];
//         //    if (f != null && f.ContentLength > 0)
//         //    {
//         //        string[] ext = f.FileName.Split('.');
//         //        string fileName = DateTime.Now.ToString("yyyyMMddHHmmssffff") + '.' + ext[ext.Length - 1];
//         //        string path = Server.MapPath("~/images/" + fileName);
//         //        f.SaveAs(path);
//         //        SP.images = "/images/" + fileName;
//         //        db.Entry(SP).State = EntityState.Modified;
//         //    }
//         //    db.SaveChanges();
//         //    return RedirectToAction("Index");
//         //}
//         // GET: Product
//         public ActionResult Search(int? IdSP, string Search)
//         {
//             List<SanPham> LSP;
//             if (IdSP == null && Search == null)
//             {
//                 LSP = db.SanPham.ToList();
//             }
//             else
//             {
//                 if (IdSP != null)
//                 {
//                     LSP = db.SanPham.Where(x => x.Id == IdSP).ToList();
//                 }
//                 else
//                 {
//                     LSP = db.SanPham.Where(x => x.Name.Contains(Search)).ToList();
//                 }
//             }

//             ViewBag.category = new SelectList(db.DanhMucSanPham.ToList(), "Id", "Name");

//             return View(LSP);
//         }
//         public ActionResult show(int ID)
//         {
//             // lấy dữ liệu của Category theo Id tương ứng
//             SanPham SP = db.SanPham.Find(ID);
//             return View(SP);
//         }
//         public ActionResult showbyID(SanPham SP)
//         {
//             SanPham obj = db.SanPham.Find(SP);
//             List<SanPham> lst = db.SanPham.ToList();
//             return View(lst);
//         }
//     }
// }

const { json } = require("express");
const SanPhams = require("../models/SanPhams");
const {mutipleMongooseToObject, mongooseToObject} = require('../../ulti/mongoose')

class sanphamsController {
    index(req,res){
        res.send('abc')
    }
    
    show(req, res,next) {
        SanPhams.findOne({slug: req.params.slug})
            .then(sanpham =>
                // res.json(course)
                res.render("SanPham/show",{sanpham: mongooseToObject(sanpham)})
            )
            .catch(next)
    }

    create(req, res,next) {
            res.render('SanPham/Create')
    }

    store(req, res,next) {
        const sanpham = new SanPhams(req.body)
        sanpham.save()
            .then(() => res.redirect('/'))
            .catch(error=>{

            })
}
    
}

module.exports = new sanphamsController();
