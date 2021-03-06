import db from '../db/db';

export class Record {
  constructor({
    title,
    type,
    createdBy,
    comment,
    location,
    images,
    videos,
    emailNotify,
  }) {
    this.title = title;
    this.type = type;
    this.createdBy = createdBy;
    this.comment = comment;
    this.location = location;
    this.images = images instanceof Array && images.length ? images : [];
    this.videos = videos instanceof Array && videos.length ? videos : [];
    this.emailNotify = emailNotify || false;
    this.status = 'draft';
  }

  static getAll() {
    return db.query(`SELECT * FROM records ORDER BY id ASC`);
  }

  static getAllByType(type) {
    const queryString = [
      `SELECT * FROM records WHERE type = $1 ORDER BY id ASC`,
      [type],
    ];
    return db.query(...queryString);
  }

  static getOneByID(id) {
    const queryString = [`SELECT * FROM records WHERE id = $1`, [id]];
    return db.query(...queryString);
  }

  static patch(id, patch, prop) {
    const queryString = [
      `UPDATE records SET ${prop} = ($1) WHERE id =($2) returning *`,
      [patch, id],
    ];

    return db.query(...queryString);
  }

  static delete(id) {
    const queryString = [`DELETE FROM records WHERE id = $1`, [id]];
    return db.query(...queryString);
  }

  save() {
    const queryString = [
      'INSERT INTO records(title, type, location, comment, status, created_by, email_notify, images, videos) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [
        this.title,
        this.type,
        this.location,
        this.comment,
        this.status,
        this.createdBy,
        this.emailNotify,
        JSON.stringify(this.images),
        JSON.stringify(this.videos),
      ],
    ];
    return db.query(...queryString);
  }
}

export class RedFlag extends Record {
  constructor({ ...args }) {
    super({ type: 'red-flag', ...args });
  }

  static getAll() {
    return super.getAllByType('red-flag');
  }

  static getOneByID(id) {
    return super.getOneByID(id);
  }

  static patch(id, patch, prop) {
    return super.patch(id, patch, prop);
  }

  static delete(id) {
    return super.delete(id);
  }
}

export class Intervention extends Record {
  constructor({ ...args }) {
    super({ type: 'intervention', ...args });
  }

  static getAll() {
    return super.getAllByType('intervention');
  }

  static getOneByID(id) {
    return super.getOneByID(id);
  }

  static patch(id, patch, prop) {
    return super.patch(id, patch, prop);
  }

  static delete(id) {
    return super.delete(id);
  }
}
