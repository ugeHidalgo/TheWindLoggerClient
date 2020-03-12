import { SessionMaterial } from 'src/app/models/sessionMaterial';
import { Material } from 'src/app/models/material';

export interface SessionMaterialDialogData {
    materials: Material[];
    sessionMaterial: SessionMaterial;
  }