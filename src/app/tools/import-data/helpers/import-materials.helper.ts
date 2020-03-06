import { Observable } from 'rxjs';
import { Material } from 'src/app/models/material';
import { MaterialsService } from 'src/app/services/materials/materials-service.service';

export class ImportMaterialsHelper {

  fieldNames: string[];

  constructor(
    private materialsService: MaterialsService
  ) { }

  import(data): Observable<Material[]> {
    const me = this;
    var material: Material,
        materials: Material[] = [],
        userNameIndex,
        nameIndex,
        descriptionIndex,
        materialTypeIndex,
        brandIndex,
        modelIndex,
        yearIndex,
        sizeIndex,
        secondHandIndex,
        purchaseDateIndex,
        purchasePriceIndex,
        purchaseFromIndex,
        saleDateIndex,
        salePriceIndex,
        soldToIndex,
        commentsIndex,
        activeIndex;

    me.fieldNames = data[0];
    userNameIndex = me.fieldNames.indexOf('UserName');
    nameIndex = me.fieldNames.indexOf('Name');
    descriptionIndex = me.fieldNames.indexOf('Description');
    materialTypeIndex = me.fieldNames.indexOf('MaterialType');
    brandIndex = me.fieldNames.indexOf('Brand');
    modelIndex = me.fieldNames.indexOf('Model');
    yearIndex = me.fieldNames.indexOf('Year');
    sizeIndex = me.fieldNames.indexOf('Size');
    secondHandIndex = me.fieldNames.indexOf('SecondHand');
    purchaseDateIndex = me.fieldNames.indexOf('PurchaseDate');
    purchasePriceIndex = me.fieldNames.indexOf('PurchasePrice');
    purchaseFromIndex = me.fieldNames.indexOf('PurchaseFrom');
    saleDateIndex = me.fieldNames.indexOf('SaleDate');
    salePriceIndex = me.fieldNames.indexOf('SalePrice');
    soldToIndex = me.fieldNames.indexOf('SoldTo');
    commentsIndex = me.fieldNames.indexOf('Comments');
    activeIndex = me.fieldNames.indexOf('Active');

    for (var f=1; f<data.length; f++)
    {
      var rowData = data[f];

      material = new Material;
      material.userName = rowData[userNameIndex];
      material.name = rowData[nameIndex];
      material.description = rowData[descriptionIndex];
      material.materialType = rowData[materialTypeIndex];
      material.brand = rowData[brandIndex];
      material.model = rowData[modelIndex];
      material.year = rowData[yearIndex];
      material.size = rowData[sizeIndex];
      material.secondHand = rowData[secondHandIndex];
      material.purchaseDate = me.excelDateToJSDate(rowData[purchaseDateIndex]);
      material.purchasePrice = rowData[purchasePriceIndex];
      material.purchaseFrom = rowData[purchaseFromIndex];
      material.saleDate = me.excelDateToJSDate(rowData[saleDateIndex]);
      material.salePrice = rowData[salePriceIndex];
      material.soldTo = rowData[soldToIndex];
      material.comments = rowData[commentsIndex];
      material.active = rowData[activeIndex].trim() === 'true' ? true : false;

      materials.push(material);
    }

    return me.materialsService.createMaterials(materials);
  }

  excelDateToJSDate(value) {
    var utc_days  = Math.floor(value - 25569);
    var utc_value = utc_days * 86400;
    var date_info = new Date(utc_value * 1000);

    var fractional_day = value - Math.floor(value) + 0.0000001;

    var total_seconds = Math.floor(86400 * fractional_day);

    var seconds = total_seconds % 60;

    total_seconds -= seconds;

    var hours = Math.floor(total_seconds / (60 * 60));
    var minutes = Math.floor(total_seconds / 60) % 60;

    return new Date(date_info.getFullYear(), date_info.getMonth()+1, date_info.getDate(), hours, minutes, seconds);
 }
};
