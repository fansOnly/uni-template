import aes from './lib/AES'
import md5 from './lib/MD5'
import rsa from './lib/RSA'

export default {
  /**
   * aes加密
   */
  aesEncrypt : function(data, aeskey) {
    var key = aes.enc.Utf8.parse(aeskey);
    var iv = aes.enc.Utf8.parse("SHYTBASESHYTBASE");
    var srcs = aes.enc.Utf8.parse(data);
    var mode = aes.mode.CBC;
    var pad = aes.pad.Pkcs7
    var encrypted = aes.AES.encrypt(srcs, key, {
      iv : iv,
      mode : mode,
      padding : pad
    });
    var result = encrypted.ciphertext.toString(aes.enc.Base64);
    return result;
  },
  /**
   * aes解密
   */
  aesDecrypt : function(data, key, iv, mode, pad) {
    key = aes.enc.Utf8.parse(key || this.getAesKey());
    iv = iv || aes.enc.Utf8.parse("SHYTBASESHYTBASE");
    mode = mode || aes.mode.CBC;
    pad = pad || aes.pad.Pkcs7;
    data = aes.AES.decrypt(data, key, {
      iv : iv,
      mode : mode,
      padding : pad
    });
    return data.toString(aes.enc.Utf8);
  },
  /**
   * md5加密
   */
  md5Encrypt : function(data, aeskey) {
    return md5.md5(aeskey + data);
  },
  /**
   * rsa加密
   */
  rsaEncrypt : function(data) {
    var encrypt_rsa = new rsa.RSAKey();
    encrypt_rsa = rsa.KEYUTIL.getKey(this.getPublicKey());
    var encStr = encrypt_rsa.encrypt(data)
    encStr = rsa.hex2b64(encStr);
    return encStr;
  },
  /**
   * 三段式加密
   */
  encrypt : function(data, aeskey) {
    if (typeof data != 'string') {
      data = JSON.stringify(data);
    }
    var rsaText = this.rsaEncrypt(aeskey);
    var aesText = this.aesEncrypt(data, aeskey);
    var md5Text = this.md5Encrypt(data, aeskey);
    var result = [ md5Text, aesText, rsaText ].join(String
        .fromCharCode(29));
    return result;
  },
  getAesKey : function() {
    return this.uuid(16, 16);
  },
  uuid : function(len, radix) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
        .split('');
    var uuid = [], i;
    radix = radix || chars.length;
    if (len) {
      for (i = 0; i < len; i++)
        uuid[i] = chars[0 | Math.random() * radix];
    } else {
      var r;
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
      uuid[14] = '4';
      for (i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random() * 16;
          uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
        }
      }
    }
    return uuid.join('');
  },
  /**
   * 获取公共秘钥
   */
  getPublicKey : function() {
    return '-----BEGIN CERTIFICATE-----MIIDaTCCAlGgAwIBAgIEMy5JKjANBgkqhkiG9w0BAQsFADBlMQswCQYDVQQGEwJDTjELMAkGA1UECBMCU0gxCzAJBgNVBAcTAlNIMQ8wDQYDVQQKEwZ5aXRvbmcxDzANBgNVBAsTBnlpdG9uZzEaMBgGA1UEAxMRd3d3LnlpdG9uZy5jb20uY24wHhcNMTkwMTMwMDU0MDQyWhcNMjkwMTI3MDU0MDQyWjBlMQswCQYDVQQGEwJDTjELMAkGA1UECBMCU0gxCzAJBgNVBAcTAlNIMQ8wDQYDVQQKEwZ5aXRvbmcxDzANBgNVBAsTBnlpdG9uZzEaMBgGA1UEAxMRd3d3LnlpdG9uZy5jb20uY24wggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDABptK1rQv7XBHpnA9mkC3ISiIsG3x7ImM4zbu+BypklhaGwRYU/rMvWLJko+KvRSStmdcwd9GZC+1upQG+CBAzz45nJsC7E3axoSvkL5upeyzLhIpO420QZKxTa2zfUTXrk9XIbpinb0jU5kVrVmZRAHmL3pCgO62t+2jNRQ4mr0WqR4J0QGt23tprE2e5MRT41nxry1qe6BNOI0Utg+ZlKVO7/1JiDZul4bYMGlK0oGleyUUa2dz+YubQn8zPUYz033bJlUQzx4njdOzN5CUp5MdVoGeL8vFuNCJ/ZmXN9rbtntgg3tesQjz9DzbVFR6izC4zsJH486iqSBUHGNxAgMBAAGjITAfMB0GA1UdDgQWBBS9x9uEcL63lBv1XmYiv9tHAYaO3DANBgkqhkiG9w0BAQsFAAOCAQEAbdHEU0otIF8G9YPAY+H/h1fCkb3oFR0++DquLhBDUXw5fbgIcZhIxS/LGb/aI1EzbPnkxYfy0QANt1izM/eUXN2YCPbN6iTCHbgVkqZWyzNzMwQhYVONdWlH+7Npd1VtnJnynnmguU1g0ogvLxu/zufgVxfJNRQHOk7v0MN/vwegC8nVehwbg1dfr5a+G4gpd6gwc48DWVK+Ih88YoSQ+yJi6awdtQrl/qm9nbPdhIVoWATHrBLPIonlS9qULw47KkSzMmYYulCfbVCCXb0wbh6GYCrTQs0vJapu3R1Czw+s1jZwJGP5AKISAckrEy9kZ9D5LXTt8Osb0oXU+M2Bfg==-----END CERTIFICATE-----';
  },
  /**
   * 默认的解密方式
   */
  decrypt : function(data, aesKey) {
    var encryptData = data.substring(14); // 取得数据体
    // 拆分控制码
    var confuseStartPos = parseInt(data.substring(3, 5), 16);// 混淆起始点
    var confuseLen = parseInt(data.substring(5, 7), 16); // 混淆长度
    var confuseRule = parseInt(data.substring(7, 8), 16); // 混淆规则
    var originalLen = parseInt(data.substring(8, 14), 16); // 数据原长度
    // 反混淆
    var confuseData = "";
    var confuseStr = encryptData.substring(confuseStartPos,
        confuseStartPos + confuseLen); // 混淆内容
    var confuseStrLen = confuseStr.length; // 混淆内容长度
    confuseData += encryptData.substring(0, confuseStartPos); // 追加未混淆部分
    switch (confuseRule) {
    case 1: // 首尾对换
      confuseData += confuseStr.charAt(confuseStrLen - 1);
      confuseData += confuseStr.substring(1, confuseStrLen - 1);
      confuseData += confuseStr.charAt(0);
      break;
    case 2: // 基偶对换
      for (var j = 2; j <= confuseStrLen; j++) {
        if (j % 2 == 0) {
          confuseData += confuseStr.charAt(j - 1);
          confuseData += confuseStr.charAt(j - 2);
        }
      }
      if (confuseStrLen % 2 != 0 && confuseStrLen > 0) {
        confuseData += confuseStr.charAt(confuseStrLen - 1);
      }
      break;
    default:
      break;
    }
    if (0 != confuseRule) {
      confuseData += encryptData.substring(confuseStartPos
          + confuseLen);
      encryptData = confuseData;
    }
    // 反填充
    encryptData = encryptData.substring(0, originalLen);
    encryptData = aes.enc.Hex.parse(encryptData);// 先解16进制
    var cipherParams = aes.lib.CipherParams.create({
      ciphertext : encryptData
    });
    var result = this.aesDecrypt(cipherParams, aesKey);
    // return result ? eval("(" + result + ")") : {};
    return result ? JSON.parse(result) : {};
  }
}