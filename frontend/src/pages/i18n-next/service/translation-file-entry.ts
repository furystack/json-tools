export class TranslationFileEntry {
  private _isDirty: boolean = false
  public get isDirty(): boolean {
    return this._isDirty
  }
  public set isDirty(v: boolean) {
    this._isDirty = v
  }

  private _values: Record<string, string>
  public getValues() {
    return this._values
  }

  public setValues(values: Record<string, string>) {
    this._values = values
    this.isDirty = true
  }

  public setValue(key: string, value: string) {
    this._values[key] = value
    this.isDirty = true
  }

  public async resetValues() {
    this._values = this.savedValues
    this.isDirty = false
  }

  public async saveValues() {
    const permissionResult = await this.file.requestPermission({ mode: 'readwrite' })

    if (permissionResult === 'granted') {
      const writable = await this.file.createWritable({})
      await writable.write(JSON.stringify(this._values, null, 2))
      await writable.close()
      this.savedValues = this._values
      this.isDirty = false
    }
  }

  constructor(
    public readonly file: FileSystemFileHandle,
    public readonly locale: string,
    public readonly namespace: string,
    public readonly relativePath: string,

    private savedValues: Record<string, string>,
  ) {
    this._values = savedValues
  }
}
